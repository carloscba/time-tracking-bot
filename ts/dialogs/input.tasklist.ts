var builder = require('botbuilder');
var dotenv = require('dotenv').config();
var winston = require('winston');
winston.level = 'debug';

//Users
import {Client as clientObj} from "../class/client";
import {Task as taskObj} from "../class/task";

export module InputTaskList {
    export function dialog() {
        
        const client = new clientObj.Client(process.env.DJANGO_ACCESS_TOKEN);
        const task = new taskObj.Task(process.env.DJANGO_ACCESS_TOKEN);

        const dialog = [

            //list task
            (session, aiResult) => {
                
                session.sendTyping();
                task.get(null).then(function(response){
                    winston.log('debug', 'list of tasks', response.data.results);
                    let tasks = response.data.results;

                    tasks.map(function(task){
                        session.send(task.description);
                    })
                    session.endDialog();

                }).catch(function(error){
                    winston.log('debug', 'Error on list tasks');
                    session.endDialog('Se ha producido un error al listar las tareas');
                });
            },

        ];//var dialog
        
        return dialog;
    }
}
