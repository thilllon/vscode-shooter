// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "thn" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('thn.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from thn-extension!');
  });

  context.subscriptions.push(disposable);

  // --------------------------------
  // --------------------------------

  // const disposable2 = vscode.languages.registerDocumentLinkProvider(
  //   'plaintext',
  //   new HelloContentProvider(),
  // );
  // context.subscriptions.push(disposable2);

  // vscode.commands.registerCommand('hello.buttonClick', () => {
  //   vscode.window.showInformationMessage('Hello button clicked!');
  // });

  // --------------------------------
  // --------------------------------

  // in keybindings.json
  // {
  //   "key": "ctrl+shift+v",
  //   "command": "extension.pasteImage"
  // }

  const disposable3 = vscode.commands.registerCommand('extension.pasteImage', function () {
    vscode.env.clipboard.readText().then((text) => {
      // option 1. local file
      // create an image file using text
      // get the relative path of the image file
      // insert the relative path into the active editor
      // option 2. cloud upload
      // upload the image to cloud
      // get the url of the image
      // insert the url into the active editor
    });
    // vscode.env.clipboard.readImage().then((imageData) => {
    //   const editor = vscode.window.activeTextEditor;
    //   if (editor) {
    //     const markdownImage = `![Alt text](${imageData})`;
    //     const position = editor.selection.active;
    //     const edit = new vscode.TextEdit(new vscode.Range(position, position), markdownImage);
    //     editor.edit(edit);
    //   }
    // });
    // context.subscriptions.push(disposable3);
  });
}

class HelloContentProvider implements vscode.TextDocumentContentProvider {
  provideTextDocumentContent(
    uri: vscode.Uri,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<string> {
    return new Promise((resolve, reject) => {
      const document = vscode.window.activeTextEditor?.document;
      if (!document) {
        reject('No active document');
        return;
      }

      const lines = document.getText().split('\n');
      let result = '';
      for (const line of lines) {
        const match = line.match(/hello/i);
        if (match) {
          result += `<div><a href="#" style="color:blue" title="Click me" command="hello.buttonClick">Button</a> above hello</div>\n${line}\n`;
        } else {
          result += line + '\n';
        }
      }

      resolve(result);
    });
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
