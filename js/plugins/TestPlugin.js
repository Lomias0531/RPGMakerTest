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
    for (var j = 0; j < $gameVariables.value(28); j++) {
        var enemyIndex = Math.floor(Math.random() * $gameTroop.members().length); //获取随机敌人索引
        var enemyID = $gameTroop.members()[enemyIndex].enemyId(); //获取选中敌人的ID
        var enemyTraits = $dataEnemies[enemyID].traits; //获取选中敌人的特性列表，以数组形式返回
        var damageValue = 0;
        var Friends = $gameParty.members();
        //获取攻击力数值，并且随机化乘数
        for (var i = 0; i < Friends.length; i++) {
            if (Friends[i].actorId() == 2) {
                damageValue = Math.floor(Friends[i].atk * (0.8 + Math.random() * 0.2));
            }
        }
        //特性列表code为11是各种抗性的属性，dataId为2代表热能抗性
        for (var i = 0; i < enemyTraits.length; i++) {
            if (enemyTraits[i].code == 11) {
                if (enemyTraits[i].dataId == 2) {
                    damageValue = damageValue * enemyTraits[i].value;
                }
            }
        }
        //但是怎么显示伤害数字啊
        var curEnemyHP = $gameTroop.members()[enemyIndex].hp - damageValue;
        $gameTroop.members()[enemyIndex].performDamage(damageValue);
        $gameTroop.members()[enemyIndex].setHp(curEnemyHP);
    }
    for (var j = 0; j < $gameVariables.value(30); j++) {
        var friendIndex = Math.floor(Math.random() * $gameParty.aliveMembers().length);
        var friends = $gameParty.members();
        var healingStrength = 0;
        for (var i = 0; i < friends.length; i++) {
            if (friends[i].actorId() == 2) {
                healingStrength = Math.floor(friends[i].atk * (Math.random() * 0.5 + 0.5));
            }
        }
        var curFriendHP = $gameParty.aliveMembers()[friendIndex].hp + healingStrength;
        $gameParty.aliveMembers()[friendIndex].setHp(curFriendHP);
    }
}
var RandomlyDamageEnemy = function () {
    var enemyIndex = Math.floor(Math.random() * $gameTroop.aliveMembers().length); //获取随机敌人索引
    var enemyID = $gameTroop.members()[enemyIndex].enemyId(); //获取选中敌人的ID
    var enemyTraits = $dataEnemies[enemyID].traits; //获取选中敌人的特性列表，以数组形式返回
    var damageValue = 0;
    var Friends = $gameParty.members();
    //获取攻击力数值，并且随机化乘数
    for (var i = 0; i < Friends.length; i++) {
        if (Friends[i].actorId() == 2) {
            damageValue = Math.floor(Friends[i].atk * (0.8 + Math.random() * 0.2));
        }
    }
    //特性列表code为11是各种抗性的属性，dataId为2代表热能抗性
    for (var i = 0; i < enemyTraits.length; i++) {
        if (enemyTraits[i].code == 11) {
            if (enemyTraits[i].dataId == 2) {
                damageValue = damageValue * enemyTraits[i].value;
            }
        }
    }
    //但是怎么显示伤害数字啊
    var curEnemyHP = $gameTroop.members()[enemyIndex].hp - damageValue;
    $gameTroop.members()[enemyIndex].performDamage(damageValue);
    $gameTroop.members()[enemyIndex].setHp(curEnemyHP);
    return null;
}
var RandomlyHealAlly = function () {
    var friendIndex = Math.floor(Math.random() * $gameParty.aliveMembers().length);
    var friends = $gameParty.members();
    var healingStrength = 0;
    for (var i = 0; i < friends.length; i++) {
        if (friends[i].actorId() == 2) {
            healingStrength = Math.floor(friends[i].atk * (Math.random() * 0.5 + 0.5));
        }
    }
    var curFriendHP = $gameParty.aliveMembers()[friendIndex].hp + healingStrength;
    $gameParty.aliveMembers()[friendIndex].setHp(curFriendHP);
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