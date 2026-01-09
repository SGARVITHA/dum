import { useNavigate } from "react-router-dom";

const patients = [
  { id: 1, name: "Nita Magarpatta", condition: "Stable" },
  { id: 2, name: "Anu Sharma", condition: "Critical" },
];

const PatientList = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-teal-600 mb-4">
        Patient List
      </h1>

      {patients.map((p) => (
        <div
          key={p.id}
          className="bg-white shadow p-4 mb-3 rounded cursor-pointer hover:bg-teal-50"
          onClick={() => navigate(`/patient/${p.id}`)}
        >
          <p className="font-semibold">{p.name}</p>
          <p className="text-sm">{p.condition}</p>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
