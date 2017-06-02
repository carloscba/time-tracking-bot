var builder = require('botbuilder');
var dotenv = require('dotenv').config();
var winston = require('winston');
winston.level = 'debug';

import {Client as clientObj} from "../class/client";
import {Task as taskObj} from "../class/task";

export module InputTask {
    export function dialog() {
        
        const client = new clientObj.Client(process.env.DJANGO_ACCESS_TOKEN);
        const task = new taskObj.Task(process.env.DJANGO_ACCESS_TOKEN);

        const dialog = [

            //Prompt client name
            (session, aiResult) => {
                
                session.dialogData.task = {
                    client_name : '',
                    description : ''
                };
                
                session.sendTyping();
                client.get(null).then(function(response){

                    let clientList = response.data.results;
                    let clientListPrompt = [];
                    
                    clientList.map(function(client){
                        clientListPrompt.push(client.name);
                    })

                    winston.log('debug', 'Prompt client list');
                    winston.log('debug','clientListPrompt', clientListPrompt);

                    builder.Prompts.choice(session, "Indica el cliente", clientListPrompt);

                }).catch(function(error){
                    winston.log('Error in input.task.ts step 1');
                })

            },
            
            //save client name
            (session, results, next) => {
                
                winston.log('debug', 'Store client name');
                winston.log('debug','typeof(results.response)', typeof(results.response));
                winston.log('debug', 'results.response', results.response);
                
                if(typeof(results.response) === 'object'){
                    session.dialogData.task.client_name = results.response.entity;
                    next();
                }
            },

            //prompt task name
            (session, results) => {
                builder.Prompts.text(session, 'Describe la tarea');         
            },

            //save task name
            (session, results, next) => {

                winston.log('debug', 'Store task description');
                winston.log('debug','typeof(results.response)', typeof(results.response));
                winston.log('debug', 'results.response', results.response);

                if(typeof(results.response) === 'string'){
                    session.dialogData.task.description = results.response;
                    next();
                }
            },            
            
            //end dialog
            (session, results) => {
                
                winston.log('debug', 'session.dialogData.task', session.dialogData.task)

                session.sendTyping();
                task.post({
                    client_name : session.dialogData.task.client_name,
                    description : session.dialogData.task.description
                }).then(function(response){
                    winston.log('debug', 'New task added', response.data)
                    session.endDialog('Se ha creado la nueva tarea');
                }).catch(function(error){
                    winston.log('debug', 'Error task added', error)
                    session.endDialog('Se produjo un error al crear la tarea');                    
                })
                
                

            }

        ];//var dialog
        
        return dialog;
    }
}
