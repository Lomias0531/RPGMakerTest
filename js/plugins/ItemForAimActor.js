//=============================================================================
// ItemForAimActor
//=============================================================================
/*:
 * @plugindesc This is a Tool plugin
 * @author BreadJI
 *
 * @help
 *
 * This plugin is for judging if a item was used on the correct actor.
 * functions list:
 *      CheckItemAim(ActorID);
 *
 * @param ItemNum
 * @desc Item to check
 * @default 1
 *
 * @param ActorID
 * @desc Actor num required
 * @default 0
 *
 */

//使用官方js方法装载字典插件
const url = "ActorIDtoFacePath";
PluginManager.loadScript(url);

//检查当前物品是否用在正确的角色身上，ActorID为目标角色的ID
var CheckItemAim = function (ActorID) {
    if ($gameParty._targetActorId == ActorID) {
        return true;
    } else {
        return false;
    }
}
//快速创建带脸图的对话框
var quickMessage = function (actorID, faceID, message) {
    message = String(message);
    $gameMessage.setSpeakerName();
    $gameMessage.setFaceImage(facePath[actorID-1], faceID);
    $gameMessage.add(message);
}