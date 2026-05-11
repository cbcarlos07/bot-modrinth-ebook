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


}

module.exports = new ModrinthService