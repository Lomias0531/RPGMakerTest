//=============================================================================
// AsyncWait
//=============================================================================
/*:
 * @plugindesc This plugin offer functions to give an event gradient opactiy.
 * @author BreadJI
 *
 * @help
 *
 *
 * functions list:
 *      opactiy_Gradient_speed(id,opac,speed)
 *      opactiy_Gradient(id,opac)   default
 *
 * @param time
 * @type number
 * @desc
 * @default 0
 *
 */// JavaScript source code
function f1(id,opac) {
    $gameMap.events()[id-1]._opacity = opac;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 100);
    });
}


//�첽�ı䲻͸����,����Ϊ�¼�id��Ŀ��͸���ȣ�0-255���������ٶȣ����룩
async function opactiy_Gradient_Speed(id,opac,speed) {
    var opac_old = $gameMap.events()[id - 1]._opacity;
    var opac_differ = (opac - opac_old) / (speed / 100);


    for (var i = 0; i < parseInt(speed / 100); i++) {
        await f1(id, opac_old + opac_differ);
        opac_old = opac_old + opac_differ;
    }
}
//�첽�ı䲻͸���ȣ������ٶ�ȱʡ���̶�Ϊ1000����
async function opactiy_Gradient(id,opac) {
    var opac_old = $gameMap.events()[id - 1]._opacity;
    var opac_differ = parseInt((opac - opac_old) / 10);
    
    for (var i = 0; i < 10; i++) {
        await f1(id, opac_old + opac_differ);
        opac_old = opac_old + opac_differ;
        
    }
}