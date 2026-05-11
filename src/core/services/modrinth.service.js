const { httpModrinth } = require("../../config/http");
const { saveCache, loadCache } = require("../utils/cache");
const discordService = require("./discord.service");
const PROJECT = process.env.PROJECTS_MODRINTH;

class ModrinthService {

    getDataFromMultipleProjects(projects) {        
        return new Promise(async (resolve, reject) => {
            const res = await httpModrinth.get(
                `/projects`,
                {
                    params: {
                        ids: JSON.stringify(projects)
                    }
                }
            );
            resolve(res.data);
        })
    }

    getDataFromProject(project) {
        return new Promise(async (resolve, reject) => {
            const res = await httpModrinth.get(
                `/project/${project}`
            );
            resolve(res.data);
        })
    }

    getDataFromProjectVersion(version) {
        return new Promise(async (resolve, reject) => {
            httpModrinth.get(
                `/version/${version}`
            ).then(res => resolve(res.data))
            .catch(err => reject(err));
        })
    }

    fetchProjects(){
        return new Promise(async(resolve, reject) => {
            try {
                const res = await this.getDataFromMultipleProjects( JSON.parse( PROJECT ) );
                resolve(res);
            } catch (error) {
                reject(error)   
            }
        });
    }

    prepareMessage(project, version, type) {
        return version ? `>[${type}] New update of the modpack: ${project.title}
🆕 @everyone New version of the modpack: ${project.title}
**Version**: ${version.version_number}
**Changelog**:
${version.changelog}
URL: [Download NOW the new version of the modpack!](https://modrinth.com/modpack/${project.slug})` 
: `**[${type}]** New update of the modpack: ${project.title}
🔴 @everyone 
URL: [Download NOW the new version of the modpack!](https://modrinth.com/modpack/${project.slug})`;

    }


    prepareObject(){
        return new Promise(async(resolve, reject) => {
            try {
                const projects = await this.fetchProjects();
                const versions = await this.getDataFromProjectVersion(projects[0].versions[ projects[0].versions.length - 1 ]);
                const message = this.prepareMessage(projects[0],versions, 'New');   
                resolve(message);
            } catch (error) {
                reject(error);
            }
        });
    }


    testMessage(){
        return new Promise(async(resolve, reject) => {
            try{
                const message = await this.prepareObject()
                await discordService.sendDiscord(message); 
                resolve(message);
            } catch (error) {
                reject(error);
            }
        });
    }


}

module.exports = new ModrinthService