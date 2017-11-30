const gitTags = require('git-tags');
const semver = require('semver');
const inquirer = require('inquirer');
const child_process = require('child_process');
const cmd = require('node-cmd');
const chalk = require('chalk');
const banner = require('figlet');
const chalkRainbow = require('chalk-rainbow');
const currentPath = process.argv[2];

(async function(){
    let text = await new Promise((resolve,reject)=>{
            banner('Pimp my tags',{font:'4Max',color:'cyan'},
                function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            });

    console.log(chalkRainbow(text));

    let lastTag = await new Promise((resolve, reject) => {
        gitTags.latest(currentPath,(err, lastTag) => {
            if(err){
                reject(err);
            }else{
                resolve(lastTag);
            }
        });
    });


    console.log('|---------------------------------------------------------|');
    console.log('| '+chalk.cyan(' Welcome to Pimp my tags')+'                                |');
    console.log('| '+chalk.cyan(' version 1.0')+'                                            |');
    console.log('| '+chalk.cyan(' based on NodeJS 8.6 and developped by bwinckell')+'        |');
    console.log('|---------------------------------------------------------|');

    console.log('|---------------------------------------------------------|');
    console.log('| current git project :'+chalk.bgGreen(currentPath));
    console.log('|  Last tag was : ',chalk.bgGreen(lastTag));
    console.log('|  Next possibilities:');
    console.log('|     - Major version:', chalk.red(semver.inc(lastTag,'major')));
    console.log('|     - Minor version:', chalk.yellow(semver.inc(lastTag,'minor')));
    console.log('|     - Patch version:', chalk.magenta(semver.inc(lastTag,'patch')));
    console.log('|---------------------------------------------------------|');

    console.log('\n');
    if(lastTag){
        let t = await inquirer.prompt([{type:'list',name:'bumpType',message:'Select the type of bump you want to proceed',default:'minor',pageSize:10,choices:[new inquirer.Separator(),'major',new inquirer.Separator(),'minor',new inquirer.Separator(),'patch',new inquirer.Separator(),'exit program'],prefix:'Bump tag version \n'}])
        if(t.bumpType!='exit program'){
            let newTag = 'v'+semver.inc(lastTag,t.bumpType);
            whereToCreateNewTag(newTag);
        }else{
            console.log(chalkRainbow('\n see you soon budy'));
        }
    }else{
        console.log(chalk.red('there is no semver tag present inside your project.\n'));
        let t = await inquirer.prompt([{type:'input',name:'value',message:'Type the number of your first annoted Tag : ',default:'0.1.0'}]);
        let newTag = 'v'+t.value;
        whereToCreateNewTag(newTag);
    }

})();

async function whereToCreateNewTag(newTag){

    let choice = await inquirer.prompt([{type:'confirm',name:'value',message:'Do you want to add '+newTag+' to the current git project and at current HEAD position',prefix:'Generate new git tag \n'}])
    if(choice.value){
        generateNewGitTag(newTag);
    }else{
        let choice1 = await inquirer.prompt([{type:'confirm',name:'value',message:'Do you want to add '+newTag+' to a specific commit number',prefix:'Generate new git tag custom\n'}])
        if(choice1.value){
            let commit = await inquirer.prompt([{type:'input',name:'value',message:'Please provide a commit hash currently existing on your computer ==> : ',prefix:'Generate new git tag custom\n'}])
            generateNewGitTag(newTag,commit.value);
        }
        else {
            console.log(chalkRainbow('\n see you soon budy'));
        }
   }
}

async function generateNewGitTag(newTag,commit=false){
    await newTagMessage(newTag);
    let editor = 'git';
    if(commit===false){
        let child = child_process.spawn(editor,['tag',newTag,'-a','-F','/tmp/temp.txt'], {
            stdio: 'inherit'
        });
    }else{
        let child = child_process.spawn(editor,['tag',newTag,commit,'-a','-F','/tmp/temp.txt'], {
            stdio: 'inherit'
        });
    }
};
function newTagMessage(newTag){
    return new Promise(function(resolve,reject){

    let editor = 'nano';
    cmd.get('cp  -f templateTag.txt /tmp/temp.txt');
    let child = child_process.spawn(editor,['/tmp/temp.txt'], {
        stdio: 'inherit'
    });
    child.on('exit', function (e, code) {
        if(e){
            reject(e);
        }else{
            resolve(true);
            console.log('you created a new tag => '+ newTag);
            console.log(chalkRainbow('Don\'t forget to push your tag to share it with \'git push origin --tags\''));
        }
    });
    })


}
