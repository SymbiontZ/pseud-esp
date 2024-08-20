const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
    const provider = vscode.languages.registerCompletionItemProvider(
        'pseud-esp',
        {
            provideCompletionItems(document, position) {
                const completionItems = [];

                const keywords = [
                    //FUNCIÓN
                    { label: 'Algoritmo', kind: vscode.CompletionItemKind.Function, detail: 'Definición de algoritmo' },
                    { label: 'función', kind: vscode.CompletionItemKind.Function, detail: 'Definición de función' },
                    { label: 'fin_función', kind: vscode.CompletionItemKind.Function, detail: 'Fin de la función' },
                    { label: 'inicio', kind: vscode.CompletionItemKind.Function, detail: 'Inicio del programa' },
                    
                    //CONDICIONALES
                    { label: 'si', kind: vscode.CompletionItemKind.Keyword, detail: 'Condicional' },
                    { label: 'entonces', kind: vscode.CompletionItemKind.Keyword, detail: 'Condicional' },
                    { label: 'si_no', kind: vscode.CompletionItemKind.Keyword, detail: 'Condicional' },
                    { label: 'fin_si', kind: vscode.CompletionItemKind.Keyword, detail: 'Condicional' },
                    

                    
                    //PALABRAS CLAVE
                    { label: 'devolver', kind: vscode.CompletionItemKind.Keyword, detail: 'Retorno de función' },
                    { label: 'const', kind: vscode.CompletionItemKind.Keyword, detail: 'Retorno de función' },
                    { label: 'var', kind: vscode.CompletionItemKind.Keyword, detail: 'Espacio para asignación de variables' },

                    //TIPO VARIABLE
                    { label: 'entero', kind: vscode.CompletionItemKind.TypeParameter, detail: 'Tipo de dato' },
                    { label: 'real', kind: vscode.CompletionItemKind.TypeParameter, detail: 'Tipo de dato' },
                    { label: 'cadena', kind: vscode.CompletionItemKind.TypeParameter, detail: 'Tipo de dato' },
                    { label: 'booleano', kind: vscode.CompletionItemKind.TypeParameter, detail: 'Tipo de dato' },

                ];

                const linePrefix = document.lineAt(position).text.substr(0, position.character);

                for (const keyword of keywords) {
                    if(keyword.label.startsWith(linePrefix)) {
                        const completionItem = new vscode.CompletionItem(keyword.label, keyword.kind);
                        completionItem.detail = keyword.detail;
                        completionItems.push(completionItem);
                    }
                }

                return completionItems;

            }
        },
        ''
    );

    context.subscriptions.push(provider);

    // COMANDO PARA MOSTRAR CONFIGURACION DE COLOR DE SINTAXIS
    const showColorCustomizations = vscode.commands.registerCommand('extension.showColorCustomizations', async () => {
        const resourcePath = path.join(context.extensionPath, 'themes', 'color-customizations.json');
        if (fs.existsSync(resourcePath)) {
            const colorCustomizations = fs.readFileSync(resourcePath, 'utf8');
            const document = await vscode.workspace.openTextDocument({
                language: 'json',
                content: colorCustomizations
            });
            await vscode.window.showTextDocument(document);
        } else {
            vscode.window.showErrorMessage('No se encontró el archivo de personalización de colores.');
        }
    });

    context.subscriptions.push(showColorCustomizations);
}

function deactivate() {}

exports.activate = activate;
exports.deactivate = deactivate;
