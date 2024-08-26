import * as vscode from 'vscode';
import { MyDocumentSemanticTokensProvider } from './providers/myDocumentSemanticTokensProvider';

export function activate(context: vscode.ExtensionContext) {
    const provider = new MyDocumentSemanticTokensProvider();
    const selector = { language: 'pseud-esp', scheme: 'file' };
    const legend = new vscode.SemanticTokensLegend(['typeParameter', 'class', 'enum', 'interface', 'Namespace', 'type', 'parameter', 'variable', 'property', 'function', 'method'], []);
    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(selector, provider, legend));
}