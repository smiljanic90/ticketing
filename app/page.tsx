import TicketCard from './(components)/TicketCard';

const getTickets = async () => {
  try {
    const res = await fetch(
      'https://ticketing-jgw1kmira-smiljanic90.vercel.app/api/Tickets',
      {
        cache: 'no-cache',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res.json();
  } catch (err) {
    console.log('Failed to get tickets', err);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqeCategories = [
    ...new Set(tickets?.map(({ category }: any) => category)),
  ];
  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqeCategories?.map((uniqueCategory: any, categoryIndex) => (
            <div className="mb-4" key={categoryIndex}>
              <h2 className="">{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  ?.filter(({ category }: any) => category === uniqueCategory)
                  .map((ticket: any, ticketIndex: any) => (
                    <TicketCard
                      key={ticketIndex}
                      id={ticketIndex}
                      ticket={ticket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
