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

const url = "js/plugins/ActorIDtoFacePath.js";


function addScript(url) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
}
//��鵱ǰ��Ʒ�Ƿ�������ȷ�Ľ�ɫ���ϣ�ActorIDΪĿ���ɫ��ID
var CheckItemAim = function (ActorID) {
    if ($gameParty._targetActorId == ActorID) {
        return true;
    } else {
        return false;
    }
}
//������
var quickMessage = function (actorID, faceID, message) {
    message = String(message);
    $gameMessage.setFaceImage(getFacePath(actorID), faceID);
    $gameMessage.add(message);
}