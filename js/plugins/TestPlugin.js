//=============================================================================
// TestPlugin.js
//=============================================================================

/*:
 * @plugindesc This is a Tool plugin
 * @author Lomias
 *
 * @help
 *
 * You know this is a toolkit
 * 
 * @param ItemID
 * @desc Item to check
 * @default 0
 * 
 * @param ItemNum
 * @desc Item num required
 * @default 0
 *
 */

//检测单个物品是否满足需求数量，id为物品id，num为需求数量
var CheckSingleItemRequired = function (id, num) {
    if ($gameParty.numItems($dataItems[id]) >= num) {
        return true;
    } else {
        return false;
    }
}

//检测一系列物品是否满足数量需求，以字符串形式传递参数，规则为"物品1ID,物品1数量|物品2ID，物品2数量"
var CheckItemListRequired = function (items) {
    var arr = str.split('|');
    for (var i = 0; i < arr.length; i++)
    {
        var arr1 = arr[i].split(',');
        if ($gameParty.numItems($dataItems[arr1[0]]) < arr1[1]) {
            return false;
        }
    }
    return true;
}

//提交任务所需物品，获得奖励，规则同上
var SubmitQuestRequestedItems = function (items, rewards) {
    var itemsArr = items.split('|');
    var requestFulfilled = true;
    for (var i = 0; i < itemsArr.length; i++) {
        var singleItemRequired = itemsArr[i].split(',');
        if ($gameParty.numItems($dataItems[singleItemRequired[0]]) < singleItemRequired[1]) {
            requestFulfilled = false;
            break;
        }
    }

    if (!requestFulfilled) return false;

    for (var i = 0; i < itemsArr.length; i++) {
        var singleItemRequired = itemsArr[i].split(',');
        $gameParty.loseItem($dataItems[singleItemRequired[0]], Number(singleItemRequired[1]), false);
    }

    var rewardsArr = rewards.split('|');
    for (var i = 0; i < rewardsArr.length; i++) {
        var singleReward = rewardsArr[i].split(',');
        $gameParty.gainItem($dataItems[singleReward[0]], Number(singleReward[1]), false);
    }
    return true;
}

var ResetEstinCombatSkills = function () {
    if ($gameTroop._inBattle) {

    }
}
var ExecuteEstinCombatProgram = function () {

}
var RandomlyDamageEnemy = function () {

}
var RandomlyHealAlly = function () {

}

//用于绘制UI的类
class WindowDrawer {
    constructor(window) {
        this._window = window;
    }
    //测试，用于显示当前任务细节
    DisplayQuestInfo = function (info) {
        this._window.resetFontSettings();
        const textState = this._window.createTextState(info, 5, 5, 100);
        const textArray = textState.text.split("");
        const outTextArray = [];
        let begin = 0;
        let turnPoint = 0;
        for (let i = 0; i < textArray.length; i++) {
            outTextArray.push(textArray[i]);
            const end = begin + turnPoint + 2; // +2 is length and next char.
            if (textArray[i] === "\n") {
                begin += turnPoint;
                turnPoint = 1;
            } else if (this.isTextTurn(textArray, begin, end, width)) {
                outTextArray.push("\n");
                begin += turnPoint;
                turnPoint = 0;
            } else {
                turnPoint++;
            }
        }
        textState.text = outTextArray.join("");
        this._window.processAllText(textState);
        return textState.text.split("\n").length;
    }
}