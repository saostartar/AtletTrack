// controllers/MessageController.js
import db from '../models/index.js';

class MessageController {
  // Send message from any user (atlet/koordinator)
  static async sendMessage(req, res) {
    const { isi, recipientId, conversationId } = req.body;
    const sender = req.user;
    
    try {
      let conversation;
      
      if (conversationId) {
        // Use existing conversation
        conversation = await db.Conversation.findByPk(conversationId);
      } else {
        // Create new conversation
        conversation = await db.Conversation.findOne({
          where: sender.role === 'atlet' 
            ? { atletId: sender.id, koordinatorId: recipientId }
            : { atletId: recipientId, koordinatorId: sender.id }
        });

        if (!conversation) {
          conversation = await db.Conversation.create({
            atletId: sender.role === 'atlet' ? sender.id : recipientId,
            koordinatorId: sender.role === 'koordinator' ? sender.id : recipientId
          });
        }
      }

      const message = await db.Pesan.create({
        isi,
        atletId: sender.role === 'atlet' ? sender.id : recipientId,
        koordinatorId: sender.role === 'koordinator' ? sender.id : recipientId,
        conversationId: conversation.id,
        senderRole: sender.role,
        status: 'sent'
      });

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get conversations for current user
  static async getConversations(req, res) {
    const user = req.user;
    try {
      const conversations = await db.Conversation.findAll({
        where: user.role === 'atlet' 
          ? { atletId: user.id }
          : { koordinatorId: user.id },
        include: [
          {
            model: db.Atlet,
            as: 'Atlet',
            attributes: ['id', 'nama']
          },
          {
            model: db.Koordinator,
            as: 'Koordinator',
            attributes: ['id', 'nama']
          },
          {
            model: db.Pesan,
            as: 'pesans',
            where: {
              status: 'sent',
              senderRole: user.role === 'atlet' ? 'koordinator' : 'atlet'
            },
            required: false
          }
        ],
        order: [['updatedAt', 'DESC']]
      });

      const conversationsWithUnread = conversations.map(conv => ({
        ...conv.toJSON(),
        unreadCount: conv.pesans?.length || 0
      }));

      res.json(conversationsWithUnread);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get messages in a conversation
  static async getMessages(req, res) {
    const { conversationId } = req.params;
    const user = req.user;
    
    try {
      const conversation = await db.Conversation.findOne({
        where: user.role === 'atlet'
          ? { id: conversationId, atletId: user.id }
          : { id: conversationId, koordinatorId: user.id }
      });

      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }

      const messages = await db.Pesan.findAll({
        where: { conversationId },
        include: [
          {
            model: db.Atlet,
            as: 'Atlet',
            attributes: ['id', 'nama']
          },
          {
            model: db.Koordinator,
            as: 'Koordinator', 
            attributes: ['id', 'nama']
          }
        ],
        order: [['createdAt', 'ASC']]
      });

      // Mark messages as read
      await db.Pesan.update(
        { status: 'read' },
        {
          where: {
            conversationId,
            status: 'sent',
            senderRole: user.role === 'atlet' ? 'koordinator' : 'atlet'
          }
        }
      );

      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default MessageController;