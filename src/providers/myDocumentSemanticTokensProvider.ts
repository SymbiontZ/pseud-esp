import * as vscode from 'vscode';

export class MyDocumentSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
    provideDocumentSemanticTokens(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SemanticTokens> {
        const tokensBuilder = new vscode.SemanticTokensBuilder();
        const text = document.getText();
        const regex = /\b(entero|cadena|test1)\b/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
            const startPos = document.positionAt(match.index);
            const length = match[0].length;
            tokensBuilder.push(startPos.line, startPos.character, length, 1, 0);
        }

        return tokensBuilder.build();
    }

    private _encodeTokenType(tokenType: string): number {
        const tokenTypes = ['typeParameter', 'class', 'enum', 'interface', 'Namespace', 'type', 'parameter', 'variable', 'property', 'function', 'method'];
        return tokenTypes.indexOf(tokenType);
    }

    private _encodeTokenModifiers(tokenModifiers: string[]): number {
        const tokenModifierTypes = ['declaration', 'static', 'async', 'readonly', 'defaultLibrary'];
        let result = 0;
        for (const modifier of tokenModifiers) {
            const index = tokenModifierTypes.indexOf(modifier);
            if (index > -1) {
                result |= (1 << index);
            }
        }
        return result;
    }
}
