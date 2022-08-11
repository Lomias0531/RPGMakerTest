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

//ʹ�ùٷ�js����װ���ֵ���
const url = "ActorIDtoFacePath";
PluginManager.loadScript(url);

//��鵱ǰ��Ʒ�Ƿ�������ȷ�Ľ�ɫ���ϣ�ActorIDΪĿ���ɫ��ID
var CheckItemAim = function (ActorID) {
    if ($gameParty._targetActorId == ActorID) {
        return true;
    } else {
        return false;
    }
}
//���ٴ�������ͼ�ĶԻ���
var quickMessage = function (actorID, faceID, message) {
    message = String(message);
    $gameMessage.setSpeakerName();
    $gameMessage.setFaceImage(facePath[actorID-1], faceID);
    $gameMessage.add(message);
}