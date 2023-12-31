import TicketForm from '../../(components)/TicketForm';

const getTicketById = async (id) => {
  const res = await fetch(`${process.env.API_URL}/api/Tickets/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch Ticket!');
  }
  const data = await res.json();
  return data;
};

const TicketPage = async ({ params }) => {
  const EDIT_MODE = params.id !== 'new' ? true : false;
  let updateTicketData = {};
  if (EDIT_MODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.ticket;
  } else {
    updateTicketData = {
      _id: 'new',
    };
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
