export const DUMMY = 'DUMMY';
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const MESSAGE_SENT = 'MESSAGE_SENT';

const names = `Elena	Ward
Jermaine	Terry
Beverly	Fuller
Mitchell	Alexander
Daisy	Jackson
Leigh	Dean
Deborah	Bridges
Maggie	Simmons
Cecil	Lewis
Lillian	Chandler
Kurt	Farmer
Katie	Johnston
Nina	Grant
Ruth	Ortiz
Kay	Hoffman
Ron	Reynolds
Darren	Vega
Ruben	Lucas
Nettie	Neal
Garrett	Nelson
Darnell	George
Charles	Moss
Ross	Newman
Joann	Johnson
Vera	Burgess`.split('\n').map(name => name.replace(/\s+/, ' '));

const messages = `
Am increasing at contrasted in favourable he considered astonished. As if made held in an shot. By it enough to valley desire do. Mrs chief great maids these which are ham match she. Abode to tried do thing maids. Doubtful disposed returned rejoiced to dashwood is so up. 

However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. Ourselves for determine attending how led gentleman sincerity. Valley afford uneasy joy she thrown though bed set. In me forming general prudent on country carried. Behaved an or suppose justice. Seemed whence how son rather easily and change missed. Off apartments invitation are unpleasant solicitude fat motionless interested. Hardly suffer wisdom wishes valley as an. As friendship advantages resolution it alteration stimulated he or increasing. 

Improve ashamed married expense bed her comfort pursuit mrs. Four time took ye your as fail lady. Up greatest am exertion or marianne. Shy occasional terminated insensible and inhabiting gay. So know do fond to half on. Now who promise was justice new winding. In finished on he speaking suitable advanced if. Boy happiness sportsmen say prevailed offending concealed nor was provision. Provided so as doubtful on striking required. Waiting we to compass assured. 

Able an hope of body. Any nay shyness article matters own removal nothing his forming. Gay own additions education satisfied the perpetual. If he cause manor happy. Without farther she exposed saw man led. Along on happy could cease green oh. 

Eat imagine you chiefly few end ferrars compass. Be visitor females am ferrars inquiry. Latter law remark two lively thrown. Spot set they know rest its. Raptures law diverted believed jennings consider children the see. Had invited beloved carried the colonel. Occasional principles discretion it as he unpleasing boisterous. She bed sing dear now son half. 

Blind would equal while oh mr do style. Lain led and fact none. One preferred sportsmen resolving the happiness continued. High at of in loud rich true. Oh conveying do immediate acuteness in he. Equally welcome her set nothing has gravity whether parties. Fertile suppose shyness mr up pointed in staying on respect. 

She exposed painted fifteen are noisier mistake led waiting. Surprise not wandered speedily husbands although yet end. Are court tiled cease young built fat one man taken. We highest ye friends is exposed equally in. Ignorant had too strictly followed. Astonished as travelling assistance or unreserved oh pianoforte ye. Five with seen put need tore add neat. Bringing it is he returned received raptures. 

Saw yet kindness too replying whatever marianne. Old sentiments resolution admiration unaffected its mrs literature. Behaviour new set existence dashwoods. It satisfied to mr commanded consisted disposing engrossed. Tall snug do of till on easy. Form not calm new fail. 

Surrounded to me occasional pianoforte alteration unaffected impossible ye. For saw half than cold. Pretty merits waited six talked pulled you. Conduct replied off led whether any shortly why arrived adapted. Numerous ladyship so raillery humoured goodness received an. So narrow formal length my highly longer afford oh. Tall neat he make or at dull ye. 

Knowledge nay estimable questions repulsive daughters boy. Solicitude gay way unaffected expression for. His mistress ladyship required off horrible disposed rejoiced. Unpleasing pianoforte unreserved as oh he unpleasant no inquietude insipidity. Advantages can discretion possession add favourable cultivated admiration far. Why rather assure how esteem end hunted nearer and before. By an truth after heard going early given he. Charmed to it excited females whether at examine. Him abilities suffering may are yet dependent. 
`.replace(/\s+/g, ' ').split('.');
console.log(names);

const randomNumber = (boundary) => Math.floor(Math.random() * boundary);
const random = (arr) => () => arr[randomNumber(arr.length)]
const randomMessage = random(messages);
const randomName = random(names);
const randomPayload = () => {
  return Array(8).fill({}).map((msg,i) => ( { id:  randomNumber(new Date().getTime()), user: randomName(), message: randomMessage()} ));
}

console.log(randomPayload());

export function fetchDummy(dummyArg) {
  return {
    type: DUMMY,
    payload: ["dummy"]
  }
}

export function fetchDummyMessages() {
  return dispatch => {
    setInterval(() =>  dispatch({type: MESSAGES_RECEIVED, payload: randomPayload() }) , 3000);
  }
}

const socket = new WebSocket(`ws://${location.host}/websocket/echo`);

export function fetchMessages() {
  return dispatch => {
    socket.onmessage = (message) => dispatch({type: MESSAGES_RECEIVED, payload:[{id:  randomNumber(new Date().getTime()), user: randomName(),  message:message.data }]});
  }
}

export function sendMessage(message) {
  return dispatch => {
    socket.send(message);
    dispatch({type: MESSAGE_SENT, payload: message});
  }
}
