"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyDocumentSemanticTokensProvider = void 0;
const vscode = __importStar(require("vscode"));
class MyDocumentSemanticTokensProvider {
    provideDocumentSemanticTokens(document, token) {
        const tokensBuilder = new vscode.SemanticTokensBuilder();
        const text = document.getText();
        const regex = /\b(entero|cadena)\b/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            const startPos = document.positionAt(match.index);
            const length = match[0].length;
            tokensBuilder.push(startPos.line, startPos.character, length, this._encodeTokenType('typeParameter'), 0);
        }
        return tokensBuilder.build();
    }
    _encodeTokenType(tokenType) {
        const tokenTypes = ['typeParameter', 'class', 'enum', 'interface', 'namespace', 'type', 'parameter', 'variable', 'property', 'function', 'method'];
        return tokenTypes.indexOf(tokenType);
    }
    _encodeTokenModifiers(tokenModifiers) {
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
exports.MyDocumentSemanticTokensProvider = MyDocumentSemanticTokensProvider;
