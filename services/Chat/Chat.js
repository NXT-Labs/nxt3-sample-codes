const ChatRoom = require("../../models/ChatRoom");
const ChatMember = require("../../models/ChatMember");
const ChatMessage = require("../../models/ChatMessage");
const sequelize = require("../../config/db.config");
const User = require("../../models/User");
const UserProfile = require("../../models/UserProfile");

const createMatchChat = async (matchId, members) => {
  const transaction = await sequelize.transaction();
  try {
    const chatRoom = await createNewChat(matchId, transaction);
    const chatMembers = await Promise.all(
      members.map(async (member) => await addChatMember(member, chatRoom.id, transaction))
    );

    await transaction.commit();

    return chatRoom;
  } catch (error) {
    await transaction.rollback();
    return {
      error: error,
    };
  }
};

const createNewChat = async (matchId, transaction) => {
  if (transaction) {
    return await ChatRoom.create(
      {
        matchId: matchId,
      },
      {
        transaction,
      }
    );
  } else {
    return await ChatRoom.create({
      matchId: matchId,
    });
  }
};

const addChatMember = async (member, chatRoomId, transaction) => {
  if (transaction) {
    return await ChatMember.create(
      {
        userId: member.id,
        chatRoomId: chatRoomId,
      },
      {
        transaction,
      }
    );
  } else {
    return await ChatMember.create({
      userId: member.id,
      chatRoomId: chatRoom.id,
    });
  }
};

const getChatRoomByMatch = async (matchId) => {
  try {
    const chatRoom = await ChatRoom.findOne({
      where: {
        matchId: matchId,
      },
    });

    if (!chatRoom) {
      return false;
    }

    return chatRoom;
  } catch (error) {
    console.error(error);
  }
};

const getChatRoomById = async (chatRoomId) => {
  try {
    const chatRoom = await ChatRoom.findOne({
      where: {
        id: chatRoomId,
      },
    });

    if (!chatRoom) {
      return false;
    }

    return chatRoom;
  } catch (error) {
    console.error(error);
  }
};

const postChatMessage = async (message, memberId, chatRoomId) => {
  try {
    const chatMessage = await ChatMessage.create({
      chatMemberId: memberId,
      message: message,
      chatRoomId: chatRoomId,
    });

    if (!chatMessage) {
      return false;
    }

    return chatMessage.toJSON();
  } catch (error) {
    console.error(error);
    return {
      error: error,
    };
  }
};

const getChatMembers = async (chatId) => {
  try {
    const chatMembers = await ChatMember.findAll({
      where: {
        chatRoomId: chatId,
      },
    });

    if (!chatMembers) {
      false;
    }
    return chatMembers;
  } catch (error) {
    console.error(error);
  }
};

const getChatMessages = async (chatRoomId) => {
  try {
    const messages = await ChatMessage.findAll({
      where: {
        chatRoomId: chatRoomId,
      },
      include: [
        {
          model: ChatMember,
          include: [
            {
              model: User,
              include: [
                {
                  model: UserProfile,
                  required: true,
                },
              ],
              required: true,
            },
          ],
          required: true,
        },
        {
          model: ChatRoom,
          where: {
            id: chatRoomId,
          },
          required: true,
        },
      ],
    });

    return messages;
  } catch (error) {
    console.log(error);
    return {
      error: error,
    };
  }
};

module.exports = {
  createMatchChat,
  getChatRoomByMatch,
  postChatMessage,
  getChatMembers,
  getChatRoomById,
  getChatMessages,
};
