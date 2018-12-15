// curl 'https://ssb-prod.ec.fhda.edu/PROD/bwskfcls.P_GetCrse' 
// -H 'Connection: keep-alive' 
// -H 'Cache-Control: max-age=0' 
// -H 'Upgrade-Insecure-Requests: 1' 
// -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36' 
// -H 'Origin: https://ssb-prod.ec.fhda.edu' 
// -H 'Content-Type: application/x-www-form-urlencoded' 
// -H 'DNT: 1' 
// -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' 
// -H 'Referer: https://ssb-prod.ec.fhda.edu/PROD/bwskfcls.P_GetCrse' 
// -H 'Accept-Encoding: gzip, deflate, br' 
// -H 'Accept-Language: en-US,en;q=0.9' 
// -H 'Cookie: SESSID=TUJPQUhSMjAyMTE5Nw==; shib_idp_session=584ca4655821d0f2e4017912f0fcc1e400613e0062544267d8d79613c9b8fe00; AWSELB=8FC3B10C7C6F2E81FB85778EC82E80B35F6053EB3FB0A326C415E62DF224C6255601225080A4895B1FADB06E83D852FA6F81C67E509E4E18558FABBC3EF5CBEEFF6B9E6D; IDMSESSID=7d8856bb-d16d-4db6-b6c1-440f36287eef' 
// --data 'term_in=201932&sel_subj=dummy&sel_subj=MATH&SEL_CRSE=D001B&SEL_TITLE=&BEGIN_HH=0&BEGIN_MI=0&BEGIN_AP=a&SEL_DAY=dummy&SEL_PTRM=dummy&END_HH=0&END_MI=0&END_AP=a&SEL_CAMP=dummy&SEL_SCHD=dummy&SEL_SESS=dummy&SEL_INSTR=dummy&SEL_INSTR=%25&SEL_ATTR=dummy&SEL_ATTR=%25&SEL_LEVL=dummy&SEL_LEVL=%25&SEL_INSM=dummy&sel_dunt_code=&sel_dunt_unit=&call_value_in=&rsts=dummy&crn=dummy&path=1&SUB_BTN=View+Sections' 
// --compressed

const http = require('https');
const request = require('request');
const colors = require('colors/safe');
const HTMLParser = require('node-html-parser');
const postData = 'term_in=201932&sel_subj=dummy&sel_subj=MATH&SEL_CRSE=D001B&SEL_TITLE=&BEGIN_HH=0&BEGIN_MI=0&BEGIN_AP=a&SEL_DAY=dummy&SEL_PTRM=dummy&END_HH=0&END_MI=0&END_AP=a&SEL_CAMP=dummy&SEL_SCHD=dummy&SEL_SESS=dummy&SEL_INSTR=dummy&SEL_INSTR=%25&SEL_ATTR=dummy&SEL_ATTR=%25&SEL_LEVL=dummy&SEL_LEVL=%25&SEL_INSM=dummy&sel_dunt_code=&sel_dunt_unit=&call_value_in=&rsts=dummy&crn=dummy&path=1&SUB_BTN=View+Sections';
const DEBUG = false;
const DELAY = 300000;

const options = {
    hostname: 'ssb-prod.ec.fhda.edu',
    port: 443,
    path: '/PROD/bwskfcls.P_GetCrse',
    method: 'POST',
    headers: {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
        'Origin': 'https://ssb-prod.ec.fhda.edu',
        'DNT': '1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Referer': 'https://ssb-prod.ec.fhda.edu/PROD/bwskfcls.P_GetCrse',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cookie': 'SESSID=TUJPQUhSMjAyMTE5Nw==; shib_idp_session=584ca4655821d0f2e4017912f0fcc1e400613e0062544267d8d79613c9b8fe00; AWSELB=8FC3B10C7C6F2E81FB85778EC82E80B35F6053EB3FB0A326C415E62DF224C6255601225080A4895B1FADB06E83D852FA6F81C67E509E4E18558FABBC3EF5CBEEFF6B9E6D; IDMSESSID=7d8856bb-d16d-4db6-b6c1-440f36287eef',
        
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    if (DEBUG) {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    }
    
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        // console.log(`BODY: ${chunk}`);
        processHTML(chunk);
    });
    res.on('end', () => {
        if (DEBUG)
            console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});



// write data to request body



try {
    selfTest();
    mainLoop();
}
catch(err) {
    alertERR(err);
}

function mainLoop () {
    setTimeout(function () {
        req.write(postData);
        req.end();
        theLoop();
    }, DELAY);
  }

function selfTest() {
    req.write(postData);
    req.end();
    console.info("Start Up Test completed!");
    console.info("Delay Set: " + DELAY);
}

function processHTML (data) {
    const root = HTMLParser.parse(data);
    root.querySelectorAll('tr').forEach(function(item, index) {
        if(index === 0) {
            var itemTarget = item.toString();
            if(itemTarget.includes('Jian Yu  Yu')) {
                if (DEBUG)
                    console.log("\n\n\n\n\n\n" + item + index );
                if(!itemTarget.includes('<td CLASS="dddefault">0</td>\n' + '<td CLASS="dddefault">Jian Yu  Yu (<ABBR title= "Primary">P</ABBR>)</td>')) {
                    alertIFTTT();
                }
                else {
                    console.log('Unavailable :( ' + Date());
                }
                if (DEBUG)
                    console.log("END OF PARSE\n\n\n\n\n\n")
            }
        }
        
      });
    // console.log(data);
}

function alertIFTTT() {
    request.post(
        'https://maker.ifttt.com/trigger/classOpen/with/key/oaG31UULhfKGrvD6OoMM61Y08fHQEzPFlbO4qJJbWPk',
        { json: { value1: Date() } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                console.log(colors.bold('\n\n\n================='));
                console.log(colors.green(Date()));
                console.log(colors.green("OPEN SPACE FOUND!"));
                console.log(colors.bold('=================\n\n\n'));
            }
        }
    );
}

function alertERR(err) {
    request.post(
        'https://maker.ifttt.com/trigger/classErr/with/key/oaG31UULhfKGrvD6OoMM61Y08fHQEzPFlbO4qJJbWPk',
        { json: { value1: Date(), value2: err } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                console.error("PROGRAM EXCEPTION. Notification sent!");
                console.log(Date());
            }
        }
    );
}
