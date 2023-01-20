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
            $gameMessage.add("需要获取"+$dataItems[arr1[0]].name+arr1[1]+"个");
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
    //选择过多少次锁定敌人为目标，就执行多少次伤害
    for (var j = 0; j < $gameVariables.value(28); j++) {
        var enemyIndex = Math.floor(Math.random() * $gameTroop.members().length); //获取随机敌人索引
        var enemyID = $gameTroop.members()[enemyIndex].enemyId(); //获取选中敌人的ID
        var enemyTraits = $dataEnemies[enemyID].traits; //获取选中敌人的特性列表，以数组形式返回
        var damageValue = 0;
        var Friends = $gameParty.members();
        //获取攻击力数值，并且随机化乘数，具体系数为0.8至1之间随机数乘5，乘以叠加次数
        for (var i = 0; i < Friends.length; i++) {
            if (Friends[i].actorId() == 2) {
                damageValue = Math.floor(Friends[i].atk * (0.8 + Math.random() * 0.2) * 5 * $gameVariables.value(25));
                break;
            }
        }
        //特性列表code为11是各种抗性的属性，dataId为2代表热能抗性
        for (var i = 0; i < enemyTraits.length; i++) {
            if (enemyTraits[i].code == 11) {
                if (enemyTraits[i].dataId == 2) {
                    damageValue = damageValue * enemyTraits[i].value;
                    break;
                }
            }
        }
        //但是怎么显示伤害数字啊
        $gameTroop.members()[enemyIndex].gainHp(damageValue * -1);
        $gameTroop.members()[enemyIndex].onDamage(damageValue);
        $gameTroop.members()[enemyIndex].performDamage();
    }
    //选择过多少次己方作为目标，就执行多少次治疗
    for (var j = 0; j < $gameVariables.value(30); j++) {
        var friendIndex = Math.floor(Math.random() * $gameParty.aliveMembers().length);
        var friends = $gameParty.members();
        var healingStrength = 0;
        //获取攻击力数值，随机化系数，具体系数为0.5至1之间随机数乘8，乘以叠加次数
        for (var i = 0; i < friends.length; i++) {
            if (friends[i].actorId() == 2) {
                healingStrength = Math.floor(friends[i].atk * (Math.random() * 0.5 + 0.5) * 8 * $gameVariables.value(26));
                break;
            }
        }
        $gameParty.aliveMembers()[friendIndex].gainHp(healingStrength);
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
            damageValue = Math.floor(Friends[i].atk * (0.8 + Math.random() * 0.2) * 5);
            break;
        }
    }
    //特性列表code为11是各种抗性的属性，dataId为2代表热能抗性
    for (var i = 0; i < enemyTraits.length; i++) {
        if (enemyTraits[i].code == 11) {
            if (enemyTraits[i].dataId == 2) {
                damageValue = damageValue * enemyTraits[i].value;
                break;
            }
        }
    }
    //但是怎么显示伤害数字啊
    $gameTroop.members()[enemyIndex].gainHp(damageValue * -1);
    $gameTroop.members()[enemyIndex].onDamage(damageValue);
    $gameTroop.members()[enemyIndex].performDamage();
    return null;
}
var RandomlyHealAlly = function () {
    var friendIndex = Math.floor(Math.random() * $gameParty.aliveMembers().length);
    var friends = $gameParty.members();
    var healingStrength = 0;
    for (var i = 0; i < friends.length; i++) {
        if (friends[i].actorId() == 2) {
            healingStrength = Math.floor(friends[i].atk * (Math.random() * 0.5 + 0.5) * 8);
            break;
        }
    }
    $gameParty.aliveMembers()[friendIndex].gainHp(healingStrength);
}

var InitRandomQuest = function(bountyIdList, baseBountyNum, requestIdList, baseRequestNum, rewardList, baseRewardNum, baseRewardCash)
{
    if(!$gameSwitches.value(7))
    {
        var choiceEnd = false;
        //若之前未接受过任务
        do
        {
            var questType = Math.floor(Math.random() * 2);

            var rewardArr = rewardList.toString().split('|');
            var rewardIndex = Math.floor(Math.random() * rewardArr.length);
            $gameVariables.setValue(44,Number(rewardArr[rewardIndex]));
            var rewardNum = Math.floor(baseRewardNum * (0.5 + Math.random)) + 1;
            $gameVariables.setValue(45,Number(rewardNum));
            var rewardCah = Math.floor(baseRewardCash * (0.5 + Math.random())) + 1;
            $gameVariables.setValue(47,Number(rewardCah));

            switch(questType)
            {
                case 0:
                    //怪物悬赏
                    $gameVariables.setValue(41,0);
                    var bountyArr = bountyIdList.toString().split('|');
                    var resultIndex = Math.floor(Math.random() * bountyArr.length);
                    $gameVariables.setValue(42,bountyArr[resultIndex]);
                    var bountyNum = Math.floor(baseBountyNum * (0.5 + Math.random())) + 1;
                    $gameVariables.setValue(43,bountyNum);
                    $gameMessage.newPage();
                    $gameMessage.add("需要击败"+$dataEnemies[$gameVariables.value(42)].name+$gameVariables.value(43)+"个");
                    $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
                    break;
                case 1:
                    //需求物品
                    $gameVariables.setValue(41,1);
                    var reqArr = requestIdList.toString().split('|');
                    var resultIndex = Math.floor(Math.random() * reqArr.length);
                    $gameVariables.setValue(42,reqArr[resultIndex]);
                    var reqNum = Math.floor(baseRequestNum * (0.5 + Math.random())) + 1;
                    $gameVariables.setValue(43,reqNum);
                    $gameMessage.newPage();
                    $gameMessage.add("需要获取"+$dataItems[$gameVariables.value(42)].name+$gameVariables.value(43)+"个");
                    $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
                    break;
            }

            $gameMessage.newPage();
            var choices = [];
            $gameMessage.setChoices(choices,0,2);
            choices.push("接受任务");
            choices.push("其他任务");
            choices.push("离开公告板");
            $gameMessage.newPage();

            $gameMessage.setChoiceCallback(function(resultIndex)
            {
                $gameVariables.setValue(6,resultIndex);
                console.log(resultIndex);
            });
            switch($gameVariables.value(6))
                {
                    case 0:
                        {
                            console.log("1");
                            choiceEnd = true;
                            $gameSwitches.setValue(7,true);
                            break;
                        }
                    case 1:
                        {
                            choiceEnd = false;
                            $gameSwitches.setValue(7,false);
                            console.log("2");
                            break;
                        }
                    case 2:
                        {
                            choiceEnd = false;
                            $gameSwitches.setValue(7,false);
                            console.log("3");
                            return;
                        }
                }
        }while(!choiceEnd);
    }else
    {
        //若之前接受过任务
        switch($gameVariables.value(41))
        {
            case 0:
                {
                    var bountyFinishedNum = $gameVariables.value(46);
                    var bountyRequestedNum = $gameVariables.value(43);
                    if(bountyFinishedNum == bountyRequestedNum)
                    {
                        $gameMessage.newPage();
                        $gameMessage.add("任务完成。");
                        $gameMessage.newPage();
                        $gameParty.gainItem($dataItems[$gameVariables.value(44)],$gameVariables.value(45));
                        $gameParty.gainGold($gameVariables.value(47));
                        $gameSwitches.setValue(7,false);
                        $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
                    }else
                    {
                        $gameMessage.newPage();
                        $gameMessage.add("需要击败"+$dataEnemies[$gameVariables.value(42)].name+$gameVariables.value(43)+"个");
                        $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
                    }
                    break;
                }
            case 1:
                {
                    if($gameParty.numItems($dataItems[$gameVariables.value(42)]) == $gameVariables.value(43))
                    {
                        $gameMessage.newPage();
                        $gameMessage.add("任务完成。");
                        $gameMessage.newPage();
                        $gameParty.loseItem($dataItems[$gameVariables.value(42)],$gameVariables.value(43),false);
                        $gameParty.gainItem($dataItems[$gameVariables.value(44)],$gameVariables.value(45));
                        $gameParty.gainGold($gameVariables.value(47));
                        $gameSwitches.setValue(7,false);
                        $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
                    }else
                    {
                        $gameMessage.newPage();
                        $gameMessage.add("需要获取"+$dataItems[$gameVariables.value(42)].name+$gameVariables.value(43)+"个");
                        $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
                    }
                    break;
                }
        }
    }
}
//检查战斗结束时已经击败多少任务目标
var CheckIsVictory = function(){
    if(!$gameParty.inBattle())
    {
        for(var i = 0;i<$gameTroop.deadMembers().length;i++)
        {
            if($gameTroop.deadMembers()[i].enemyId() == $gameVariables.value(42))
            {
                var num = $gameVariables.value(46);
                num +=1;
                $gameVariables.setValue(46,num);
            }
        }
        $gameSwitches.setValue(47,false);
    }
}
var InitRandomQuestSimple = function(bountyIdList, baseBountyNum, requestIdList, baseRequestNum, rewardList, baseRewardNum, baseRewardCash)
{
    var questType = Math.floor(Math.random() * 2);

    var rewardArr = rewardList.toString().split('|');
    var rewardIndex = Math.floor(Math.random() * rewardArr.length);
    $gameVariables.setValue(44,Number(rewardArr[rewardIndex]));
    var rewardNum = Math.floor(baseRewardNum * (0.5 + Math.random())) + 1;
    $gameVariables.setValue(45,Number(rewardNum));
    var rewardCah = Math.floor(baseRewardCash * (0.5 + Math.random()));
    $gameVariables.setValue(47,Number(rewardCah));

    switch(questType)
    {
        case 0:
            //怪物悬赏
            $gameVariables.setValue(41,0);
            var bountyArr = bountyIdList.toString().split('|');
            var resultIndex = Math.floor(Math.random() * bountyArr.length);
            $gameVariables.setValue(42,bountyArr[resultIndex]);
            var bountyNum = Math.floor(baseBountyNum * (0.5 + Math.random())) + 1;
            $gameVariables.setValue(43,bountyNum);
            $gameMessage.newPage();
            $gameMessage.add("需要击败"+$dataEnemies[$gameVariables.value(42)].name+$gameVariables.value(43)+"个");
            $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
            break;
        case 1:
            //需求物品
            $gameVariables.setValue(41,1);
            var reqArr = requestIdList.toString().split('|');
            var resultIndex = Math.floor(Math.random() * reqArr.length);
            $gameVariables.setValue(42,reqArr[resultIndex]);
            var reqNum = Math.floor(baseRequestNum * (0.5 + Math.random())) + 1;
            $gameVariables.setValue(43,reqNum);
            $gameMessage.newPage();
            $gameMessage.add("需要获取"+$dataItems[$gameVariables.value(42)].name+$gameVariables.value(43)+"个");
            $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
            break;
    }
}
var ConfirmQuestStatus = function()
{
    switch($gameVariables.value(41))
        {
            case 0:
                {
                    var bountyFinishedNum = $gameVariables.value(46);
                    var bountyRequestedNum = $gameVariables.value(43);
                    if(bountyFinishedNum == bountyRequestedNum)
                    {
                        $gameMessage.newPage();
                        $gameMessage.add("任务完成。");
                        $gameMessage.newPage();
                        $gameParty.gainItem($dataItems[$gameVariables.value(44)],$gameVariables.value(45));
                        $gameParty.gainGold($gameVariables.value(47));
                        $gameSwitches.setValue(7,false);
                        $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
                    }else
                    {
                        $gameMessage.newPage();
                        $gameMessage.add("需要击败"+$dataEnemies[$gameVariables.value(42)].name+$gameVariables.value(43)+"个");
                        $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
                    }
                    break;
                }
            case 1:
                {
                    if($gameParty.numItems($dataItems[$gameVariables.value(42)]) == $gameVariables.value(43))
                    {
                        $gameMessage.newPage();
                        $gameMessage.add("任务完成。");
                        $gameMessage.newPage();
                        $gameParty.loseItem($dataItems[$gameVariables.value(42)],$gameVariables.value(43),false);
                        $gameParty.gainItem($dataItems[$gameVariables.value(44)],$gameVariables.value(45));
                        $gameParty.gainGold($gameVariables.value(47));
                        $gameSwitches.setValue(7,false);
                        $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
                    }else
                    {
                        $gameMessage.newPage();
                        $gameMessage.add("需要获取"+$dataItems[$gameVariables.value(42)].name+$gameVariables.value(43)+"个");
                        $gameMessage.add("任务奖励：" + $dataItems[$gameVariables.value(44)].name + " " + $gameVariables.value(45) + "个，以及" + $gameVariables.value(47) + "信用点");
                    }
                    break;
                }
        }
}
var LetsStartCooking = function()
{
    //每种食材可以烹饪出的料理
    var recipe = new Map();
    recipe.set(57,[64,70,71,72,67,68]);
    recipe.set(58,[63,70,73,75,67,68]);
    recipe.set(61,[65,71,73,74,75,67,68]);
    recipe.set(62,[66,72,74,67,68]);
    //可以食用的食材
    var edible = [57,58,61,62];
    //未被使用的食材
    var materialsNotUsed = [57,58,61,62];
    var creepy = false;
    for(var t = 1;t<=5;t++)
    {
        for(var d = 0;d<materialsNotUsed.length;d++)
        {
            if(materialsNotUsed[d] == $gameVariables.value(t))
            {
                materialsNotUsed.splice(d,1);
                break;
            }
        }
    }
    console.log(materialsNotUsed);
    if(edible.includes($gameVariables.value(1)))
    {
        var availableCollection = recipe.get($gameVariables.value(1));
    }else
    {
        var availableCollection = [68];
        creepy = true;
    }
    //取每种食材可烹饪料理的交集
    for(var i = 2;i<=5;i++)
    {
        if($gameVariables.value(i) != 0)
        {
            if(edible.includes($gameVariables.value(i)))
            {
                availableCollection = availableCollection.filter(value =>recipe.get($gameVariables.value(i)).includes(value));
            }else
            {
                availableCollection = availableCollection.filter(value =>[68].includes(value));
                creepy = true;
            }
        }
    }
    console.log(availableCollection);
    if(creepy)
    {
        availableCollection = availableCollection.filter(value =>[68].includes(value));
    }else
    {
        for(var i = 0;i< materialsNotUsed.length;i++)
        {
            availableCollection = availableCollection.filter(value => !recipe.get(materialsNotUsed[i]).includes(value))
        }
    }
    console.log(availableCollection);
    var index = Math.floor(availableCollection.length * Math.random());
    $gameParty.gainItem($dataItems[availableCollection[index]],1);
    $gameMessage.newPage();
    $gameMessage.add("获得了" + $dataItems[availableCollection[index]].name);
}