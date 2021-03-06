// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { selectFiletype } from "./selectFiletype";
import { openFile } from "./openFile";
import { searchFile } from "./searchFile";
import { mainmenu } from "./mainmenu";
import { newFolder } from "./newFolder";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	/*
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-file-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});
	*/
	context.subscriptions.push(vscode.commands.registerCommand('extension.newFile', () => {
		new selectFiletype();
	}));
	context.subscriptions.push(vscode.commands.registerCommand('extension.openFile', () => {
		new openFile();
	}));
	context.subscriptions.push(vscode.commands.registerCommand('extension.searchFile', () => {
		new searchFile();
	}));
	context.subscriptions.push(vscode.commands.registerCommand('extension.mainmenu', () => {
		new mainmenu();
	}));
	context.subscriptions.push(vscode.commands.registerCommand('extension.newFolder', () => {
		new newFolder();
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
