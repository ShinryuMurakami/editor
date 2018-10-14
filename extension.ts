'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';

// var decChars: DecChars;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "semieditor" is now active!');
    // const readJson = JSON.parse(fs.readFileSync('./dict.json','utf8'));
    // const readJson = JSON.parse(fs.readFileSync('C:\\Users\\神龍\\ex-editor\\src\\dict.json','utf8'));
    const readJson = JSON.parse(fs.readFileSync('C:\\Users\\神龍\\t-script\\src\\dict.json','utf8'));

    context.subscriptions.push(vscode.commands.registerCommand('extension.color', () => {
        vscode.window.showInformationMessage("Color Range Word");
        // 特定の単語に色付け
        const timeWordList = readJson.時間;
        const strengthTimeWordList = readJson.強時間;
        const futurePhraseWordList = readJson.未来句;
        const quantityWordList = readJson.数量;
        const numberOfHoursWordList = readJson.時数ノ;
        const strengthQuantityQualifiedWordList = readJson.強数量修飾;
        const numberOfTimeWordList = readJson.回数;

        const timeWords: vscode.DecorationOptions[] = [];
        const strengthTimeWords: vscode.DecorationOptions[] = [];
        const futurePhraseWords: vscode.DecorationOptions[] = [];
        const quantityWords: vscode.DecorationOptions[] = [];
        const numberOfHoursWords: vscode.DecorationOptions[] = [];
        const strengthQuantityQualifiedWords: vscode.DecorationOptions[] = [];
        const numberOfTimeWords: vscode.DecorationOptions[] = [];
        const dependencyRelationWords: vscode.DecorationOptions[] = [];

        var timeCount = 0;
        var strengthtimeCount = 0;
        var futurephraseCount = 0;
        var quantityCount = 0;
        var numberofhoursCount = 0;
        var strengthquantityqualifiedCount = 0;
        var numberoftimeCount = 0;

        function decorateWord() {
            const activeEditor = vscode.window.activeTextEditor;
            const text = activeEditor.document.getText(); //ドキュメント取得
            var dependency_relations_list = [];

            // var file = fs.readFileSync('C:\\Users\\神龍\\ex-editor\\src\\学校給食_dependency_relations.txt');
            var file = fs.readFileSync('C:\\Users\\神龍\\t-script\\src\\学校給食_dependency_relations.txt');
            var lines = file.toString().split('\n');
            for(var line of lines){
                // var word = line.split('=>');
                dependency_relations_list.push(line);
            }
        
            //強時間
            for(var i = 0; i < strengthTimeWordList.length; i++) {
                if(text.indexOf(strengthTimeWordList[i]) !== -1){
                    var startPos = activeEditor.document.positionAt(text.indexOf(strengthTimeWordList[i]));
                    var endPos = activeEditor.document.positionAt(text.indexOf(strengthTimeWordList[i]) + strengthTimeWordList[i].length);
                    const strengthtime_decoration = { range: new vscode.Range(startPos, endPos)};
                    strengthTimeWords.push(strengthtime_decoration);
                    strengthtimeCount++;
                }
                for(var j = 0; j < dependency_relations_list.length; j++){
                    // console.log(dependency_relations_list[j]);
                    var word = dependency_relations_list[j].split('=>');
                    // if (word[0].indexOf(strengthTimeWordList[i]) !== -1) {
                    if(text.indexOf(word[0]) !== -1){
                        console.log(word[1]);
                        var relation_startPos = activeEditor.document.positionAt(text.indexOf(word[1]));
                        var relation_endPos = activeEditor.document.positionAt(text.indexOf(word[1]) + word[1].length);
                        const strengthTime_related_decoration = {range:new vscode.Range(relation_startPos,relation_endPos)};
                        console.log(strengthTime_related_decoration);
                        dependencyRelationWords.push(strengthTime_related_decoration);
                    }
                }        
            }
            activeEditor.setDecorations(strengthTimeMarkerDecoration,strengthTimeWords);
            activeEditor.setDecorations(dependencyRelation,dependencyRelationWords);

            console.log("強時間：" + strengthtimeCount);
        }
        decorateWord();
    }));

    //強時間に色付け
    const strengthTimeMarkerDecoration = vscode.window.createTextEditorDecorationType({
        'borderWidth': '1px',
        'borderRadius': '2px',
        'borderStyle': 'solid',
        // 'backgroundColor': 'rgba(0, 0, 255, 0.3)',
        'backgroundColor': 'rgba(128, 128, 0, 0.3)',
        // 'color':'blue'
        'color':'orange'
    });

    //係り受けの対象を色付け
    const dependencyRelation = vscode.window.createTextEditorDecorationType({
        'borderWidth': '1px',
        'borderRadius': '2px',
        'borderStyle': 'solid',
        'backgroundColor': 'rgba(255, 255, 0, 0.3)',
        'color':'green'
    });
}
