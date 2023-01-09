const { getDisputeRoomById, getDisputeChatMembers } = require("../Chat/Dispute");

const generateTickets = async (tickets) => {
  const formattedTickets = await Promise.all(
    tickets.map(async (ticket) => {
      if (ticket.ticket_type.type === "Dispute") {
        return await disputeTicketGenerator(ticket);
      }
    })
  );
  return formattedTickets;
};

const disputeTicketGenerator = async (ticket) => {
  let formattedTicket = {
    id: ticket.id,
    type: ticket.ticket_type.type,
    status: ticket.status,
  };

  const disputeRoom = await getDisputeRoomById(ticket.rowId);
  let members = await getDisputeChatMembers(ticket.rowId);
  members = members.map((member) => member.user);

  const matchId = disputeRoom.match.id;
  const gameProfile = disputeRoom.match.game_profile;

  formattedTicket = { ...formattedTicket, matchId, gameProfile, members };

  return formattedTicket;
};

module.exports = {
  generateTickets,
};
