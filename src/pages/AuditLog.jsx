const AuditLog = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Audit Log</h1>
      <ul className="bg-white p-4 rounded shadow space-y-2">
        <li>Vitals updated – 10:32 AM</li>
        <li>Alert acknowledged – 10:35 AM</li>
        <li>Report generated – 11:10 AM</li>
      </ul>
    </div>
  );
};

export default AuditLog;
