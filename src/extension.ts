// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { hexToRgba, rgbToString } from './hexToRgba';

type HexMatch = {
	match: string
	rgb: string
	index: number
}

const getMatches = (text: string) => {
	const hexPattern = new RegExp(/#[\da-zA-Z]+/, 'g')
	const matches: HexMatch[] = []
	let match

	while ((match = hexPattern.exec(text)) !== null) {
		const rgb = hexToRgba(match[0])

		matches.push({
			match: match[0],
			rgb: rgbToString(rgb),
			index: match.index
		})
	}

  return matches
}

const replaceMatchWithhRGBstring = (matches: HexMatch[], text: string, character: number): string | null => {
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]

    if (character >= match.index && character <= (match.index + match.match.length)) {
      const start = text.slice(0, match.index)
      const end = text.slice(match.index + match.match.length, text.length)

      return start + match.rgb + end
    }
  }

  return null
}

const ACTION_DONT_SHOW_AGAIN = 'Do not show again'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	let showNoMatchWarning = true

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hextorgb.hexToRGB', () => {
		// The code you place here will be executed every time your command is executed
		const activeEditor = vscode.window.activeTextEditor;

		if (activeEditor) {
			const { text } = activeEditor.document.lineAt(activeEditor.selection.active.line)
			const currentCharacter = activeEditor.selection.active.character

      const matches = getMatches(text)
      const newText = replaceMatchWithhRGBstring(matches, text, currentCharacter)

			if (newText === null) {
				if (showNoMatchWarning) {
					vscode.window.showWarningMessage('No hex code found under the cursor', ACTION_DONT_SHOW_AGAIN)
						.then(data => {
							if (data === ACTION_DONT_SHOW_AGAIN) {
								showNoMatchWarning = false
							}
						})
				}
				return
			}

			activeEditor.edit(builder => {
				const currentRange = activeEditor.document.lineAt(activeEditor.selection.active.line).range

				builder.replace(currentRange, newText)
			})
		}
	});

	context.subscriptions.push(disposable);
}
