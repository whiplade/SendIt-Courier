import React, { useState, useEffect } from 'react';

export default function Modal({ user, onSave }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [pendingPackages, setPendingPackages] = useState(0);
  const [deliveredPackages, setDeliveredPackages] = useState(0);


  useEffect(() => {
    if (user) {
      setName(user.name);
      setType(user.type);
      setPendingPackages(user.pendingPackages);
      setDeliveredPackages(user.deliveredPackages);
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...user,
      name,
      type,
      pendingPackages,
      deliveredPackages,
    });
  };

  return (
    <div className="modal">
        <h1>Admin Mode</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <label>
          Pending Packages:
          <input type="number" value={pendingPackages} onChange={(e) => setPendingPackages(e.target.value)} />
        </label>
        <label>
          Delivered Packages:
          <input type="number" value={deliveredPackages} onChange={(e) => setDeliveredPackages(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
