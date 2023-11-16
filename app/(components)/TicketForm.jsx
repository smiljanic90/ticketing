'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TicketForm = ({ ticket }) => {
  const EDIT_MODE = ticket._id !== 'new' ? true : false;
  const router = useRouter();
  const startingValues = {
    title: ticket.title || '',
    description: ticket.description || '',
    priority: ticket.priority || 1,
    progress: ticket.progress || 0,
    status: ticket.status || 'not started',
    category: ticket.category || 'Hardware Problem',
  };
  const [formData, setFormData] = useState(startingValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (EDIT_MODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: 'PUT',
        body: JSON.stringify({ formData }),
        'content-type': 'application/json',
      });
      if (!res.ok) {
        throw new Error('Failed to update Ticket!');
      }
      router.refresh();
      router.push('/');
      return;
    } else {
      const res = await fetch('/api/Tickets', {
        method: 'POST',
        body: JSON.stringify({ formData }),
        'content-type': 'application/json',
      });
      if (!res.ok) {
        throw new Error('Failed to create Ticket!');
      }
    }
    router.refresh();
    router.push('/');
  };
  return (
    <div className="flex justify-center">
      <form
        action=""
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDIT_MODE ? 'Update Your Ticket' : 'Create Your Ticket'}</h3>
        <label>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows={5}
        />
        <label>Category</label>
        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={formData.category}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Network Problem">Network Problem</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            type="radio"
            id="priority-1"
            name="priority"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            type="radio"
            id="priority-2"
            name="priority"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            type="radio"
            id="priority-3"
            name="priority"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            type="radio"
            id="priority-4"
            name="priority"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            type="radio"
            id="priority-5"
            name="priority"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          name="progress"
          id="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select
          name="status"
          id="status"
          onChange={handleChange}
          value={formData.status}
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="submit"
          className="btn text-white"
          value={EDIT_MODE ? 'Update Ticket' : 'Create Ticket'}
        />
      </form>
    </div>
  );
};

export default TicketForm;
