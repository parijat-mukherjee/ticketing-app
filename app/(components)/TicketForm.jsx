"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id == "new" ? false : true;
  const router = useRouter();

  let startingTicketData = {
    title: "",
    description: "",
    category: "Hardware Problem",
    priority: 1,
    progress: 0,
    status: "not started",
  };

  if (EDITMODE) {
    startingTicketData = {
      title: ticket.title,
      description: ticket.description,
      category: ticket.category,
      priority: ticket.priority,
      progress: ticket.progress,
      status: ticket.status,
    };
  }

  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update Ticket.");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify(formData),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create Ticket.");
      }
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2 "
        method="POST"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Edit Your Ticket" : "Create Your Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Network Issue">Network Issue</option>
          <option value="Firewall Permissions">Firewall Permissions</option>
          <option value="Database Access Denied">Database Access Denied</option>
          <option value="Other">Other</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            type="radio"
            id="priority-1"
            name="priority"
            value={1}
            onChange={handleChange}
            // checked={formData.priority == 1}
          />
          <label>1</label>

          <input
            type="radio"
            id="priority-2"
            name="priority"
            value={2}
            onChange={handleChange}
            // checked={formData.priority == 2}
          />
          <label>2</label>

          <input
            type="radio"
            id="priority-3"
            name="priority"
            value={3}
            onChange={handleChange}
            // checked={formData.priority == 3}
          />
          <label>3</label>

          <input
            type="radio"
            id="priority-4"
            name="priority"
            value={4}
            onChange={handleChange}
            // checked={formData.priority == 4}
          />
          <label>4</label>

          <input
            type="radio"
            id="priority-5"
            name="priority"
            value={5}
            onChange={handleChange}
            // checked={formData.priority == 5}
          />
          <label>5</label>
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <input
          type="submit"
          value={EDITMODE ? "Edit Ticket" : "Create Ticket"}
          className="btn max-w-xs"
        />
      </form>
    </div>
  );
};

export default TicketForm;
