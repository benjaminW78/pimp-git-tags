const fs = require('fs');

const pathBash = require('os').homedir();
const alias = '\nalias pimpGitTags=\' npm --prefix '+ process.env.PWD +' run start "$PWD"\'';

if(fs.existsSync(pathBash+'/.bashrc.d/bashrc_aliases')){
    appendLineToFile(alias,pathBash+'/.bashrc.d/bashrc_aliases');
}else if(fs.existsSync(pathBash+'/.bashrc')){
    appendLineToFile(alias,pathBash+'/.bashrc');
}

function appendLineToFile(content,filePath){
    fs.appendFile(filePath,content,'utf8',function (err) {
        if (err){
            console.log('une erreur c\'est produite\n',err);
        }else{
            console.log('Ajout de l\'alias pimpGitTag dans : '+ filePath +' \n');
        }
    });
}
