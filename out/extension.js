const vscode = require('vscode');

function activate(context) {
    const provider = vscode.languages.registerCompletionItemProvider(
        'pseud-esp',
        {
            provideCompletionItems(document, position) {
                const completionItems = [];

                const keywords = [

                    //NAMESPACE
                    { label: 'Const', kind: vscode.CompletionItemKind.Namespace, detail: 'Espacio para indicar constantes' },
                    { label: 'Var', kind: vscode.CompletionItemKind.Namespace, detail: 'Espacio para asignación de variables' },
                    { label: 'Tipo', kind: vscode.CompletionItemKind.Namespace, detail: 'Espacio para asignación de variables' },
                    { label: 'Algoritmo', kind: vscode.CompletionItemKind.Namespace, detail: 'Espacio para iniciar algoritmos' },
                    { label: 'inicio', kind: vscode.CompletionItemKind.Function, detail: 'Espacio para indicar las instrcucciones' },

                    //FUNCIÓN
                    { label: 'procedimiento', kind: vscode.CompletionItemKind.Function, detail: 'Definición de función "void"' },
                    { label: 'función', kind: vscode.CompletionItemKind.Function, detail: 'Definición de función' },
                    { label: 'fin_función', kind: vscode.CompletionItemKind.Function, detail: 'Fin de la función' },
                    
                    { label: 'leer', kind: vscode.CompletionItemKind.Function, detail: 'Lee contenido de una variable [scanf]' },
                    { label: 'escribir', kind: vscode.CompletionItemKind.Function, detail: 'Muestra contenido de una variable [printf]' },
                   
                    { label: 'longitud', kind: vscode.CompletionItemKind.Function, detail: 'Devuelve longitud de una cadena' },
                    { label: 'insertar', kind: vscode.CompletionItemKind.Function, detail: 'Inserta una cadena  en otra' },
                    { label: 'sustituir', kind: vscode.CompletionItemKind.Function, detail: 'Sustituye una subcadena de una cadena por otra' },
                    { label: 'subcadena', kind: vscode.CompletionItemKind.Function, detail: 'Crea una subcadena a partir de otra' },
                    { label: 'concatena', kind: vscode.CompletionItemKind.Function, detail: 'Concatena dos cadenas' },
                    { label: 'compara', kind: vscode.CompletionItemKind.Function, detail: 'Compara dos cadenas' },
                    
                    
                    //PALABRAS RESERVADAS
                    { label: 'si', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir estructura condicional simple' },
                    { label: 'entonces', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir estructura condicional' },
                    { label: 'si_no', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir estructura condicional doble' },
                    { label: 'fin_si', kind: vscode.CompletionItemKind.Keyword, detail: 'Final estructura condicional simple/doble' },

                    { label: 'según_sea', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir estructura selectiva multiple' },
                    { label: 'hacer', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir estructura selectiva multiple' },
                    { label: 'en_otro_caso', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir estructura selectiva multiple' },
                    { label: 'fin_según', kind: vscode.CompletionItemKind.Keyword, detail: 'Fin estructura selectiva multiple' },
                    
                    { label: 'mientras', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir bucle while' },
                    { label: 'hacer', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir bucle' },
                    { label: 'fin_mientras', kind: vscode.CompletionItemKind.Keyword, detail: 'Fin bucle while' },

                    { label: 'desde', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir bucle for' },
                    { label: 'hasta', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir bucle' },
                    { label: 'fin_desde', kind: vscode.CompletionItemKind.Keyword, detail: 'Fin bucle for' },

                    { label: 'repetir', kind: vscode.CompletionItemKind.Keyword, detail: 'Definir bucle do-while' },
                    { label: 'hasta_que', kind: vscode.CompletionItemKind.Keyword, detail: 'Fin bucle do-while' },

                    { label: 'devolver', kind: vscode.CompletionItemKind.Keyword, detail: 'Retorno de función' },
                    
                    //CONSTANTES
                    { label: 'Falso', kind: vscode.CompletionItemKind.Constant, detail: 'Palabra reservada para variables lógicas' },
                    { label: 'Verdadero', kind: vscode.CompletionItemKind.Constant, detail: 'Palabra reservada para variables lógicas' },
                    
                    //PROPIEDAD
                    { label: 'E', kind: vscode.CompletionItemKind.Property, detail: 'Indica parametro de entrada en una función' },
                    { label: 'S', kind: vscode.CompletionItemKind.Property, detail: 'Indica parametro de salida en una función' },
                    { label: 'E/S', kind: vscode.CompletionItemKind.Property, detail: 'Indica parametro de entrada/salida en una función' },
                    
                    //TIPO VARIABLE
                    { label: 'entero', kind: vscode.CompletionItemKind.TypeParameter, detail: 'Tipo de dato para números enteros' },
                    { label: 'real', kind: vscode.CompletionItemKind.TypeParameter, detail: 'Tipo de dato para números reales' },
                    { label: 'doble', kind: vscode.CompletionItemKind.TypeParameter, detail: 'Tipo de dato para números reales' },
                    { label: 'caracter', kind: vscode.CompletionItemKind.TypeParameter, detail: 'Tipo de dato para carácteres individuales' },
                    { label: 'cadena', kind: vscode.CompletionItemKind.TypeParameter, detail: 'Tipo de dato para strings/arrays de carácteres' },
                    { label: 'lógico', kind: vscode.CompletionItemKind.TypeParameter, detail: 'Tipo de dato (Verdadero/Falso)' },

                    //ESTRUCTURAS
                    { label: 'resgistro', kind: vscode.CompletionItemKind.Struct, detail: 'Definición de un registro' },
                    { label: 'fin_resgistro', kind: vscode.CompletionItemKind.Struct, detail: 'Final de definición de un registro' },

                    { label: 'vector [N] de', kind: vscode.CompletionItemKind.Struct, detail: 'Definición de un vector' },
                    { label: 'matriz [N,M] de', kind: vscode.CompletionItemKind.Struct, detail: 'Definición de un matriz' },


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
}

function deactivate() {}

exports.activate = activate;
exports.deactivate = deactivate;
