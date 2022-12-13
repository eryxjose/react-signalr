import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Segment, Header, Comment } from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default observer(function ChatMessage() {
    const { chatStore } = useStore();

    useEffect(() => {
        chatStore.createHubConnection();
    }, [chatStore]);


    return (
        <>
            <Segment>
                <Header>Chat Room</Header>
            </Segment>
            <Segment>
                <Comment.Group>
                    {chatStore.chatMessages.map(chatMessage => (
                        <Comment key={chatMessage.sentAt.getTime()}>
                            <Comment.Author>
                                {chatMessage.senderName}
                            </Comment.Author>
                            <Comment.Metadata>
                                <div>
                                    {chatMessage.sentAt.getDate()}
                                </div>
                            </Comment.Metadata>
                            <Comment.Content>
                                {chatMessage.text}
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
            </Segment>
        </>
    )
})