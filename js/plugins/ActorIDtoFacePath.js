//=============================================================================
// ActorIDtoFacePath
//=============================================================================
/*:
 * @plugindesc This is a Tool plugin
 * @author BreadJI
 *
 * @help
 *
 * This plugin stored the dictionaries of actors and their face files.
 * functions list:
 *      getFacePath(actorID);
 *      
 * @param actorID
 * @desc 
 * @default 0
 *
 * @param facePath
 * @desc 
 * @default 0
 */
var actorID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
//脸图路径顺序与游戏数据库中角色id对应
const facePath = [
    "SC_chan_Face",
    "Estin3",
    "BreadJI",
    "Gatling_face",
    "OscillJI",
    "",
    "",
    "",
    "",
    "",
    "",
    "Actor3",
]
//获取对应角色ID的脸图路径
var getFacePath = new function (actorID) {
    return facePath[actorID - 1];

}