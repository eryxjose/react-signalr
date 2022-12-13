import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatMessage } from "../models/chatMessage";
import { store } from "./store";

export default class ChatStore {
    chatMessages: ChatMessage[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = () => { // avaliar passar id para criar chat group
        this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:44335/chatHub', {
            accessTokenFactory: () => '---token---'
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

        this.hubConnection.start().catch(error => console.log('Erro ao estabelecer conexão', error));

        this.hubConnection.on('LoadChatMessages', (chatMessages: ChatMessage[]) => {
            runInAction(() => {
                chatMessages.forEach(chatMessage => {
                    chatMessage.sentAt = new Date(chatMessage.sentAt);
                })
                this.chatMessages = chatMessages;
            })
        })

        this.hubConnection.on('ReceiveChatMessage', (chatMessage: ChatMessage) => {
            runInAction(() => {
                chatMessage.sentAt = new Date(chatMessage.sentAt);
                this.chatMessages.unshift(chatMessage);
            })
        })
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Erro ao parar a aplicação', error));
    }

    clearChatMessages = () => {
        this.chatMessages = [];
        this.stopHubConnection();
    }

    addChatMessage = async (values: any) => {
        // avaliar passar idatendimento para criar chatgroup. Por exemplo:
        //     values.id = store.atendimentoStore.selectedAtendimento?.id;
        try {
            await this.hubConnection?.invoke('SendChatMessage', values);
        } catch (error) {
            console.log(error);
        }
    }

    
}