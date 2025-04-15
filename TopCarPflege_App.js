import { useState } from "react";

const pakete = [
  { name: "TopCar 1 (w, s + Fenster)", preis: 107.56 },
  { name: "TopCar 2 (w, s, F + Plastik)", preis: 159.66 },
  { name: "TopCar 3 (w, s, F, P, Polster)", preis: 231.93 },
  { name: "TopCar 4 (inkl Hochglanz)", preis: 302.52 },
  { name: "Nur Innenraum", preis: 200.84 },
  { name: "Nur Außen", preis: 200.84 },
  { name: "Saugen + Fenster", preis: 53.78 },
  { name: "Waschen inkl. Sprühversiegelung", preis: 53.78 },
  { name: "Extra: Tornador / Sitz / saugen", preis: 24.37 },
  { name: "Ozon (Klimadesinfektion)", preis: 75.63 },
];

const Fahrzeugfaktor = {
  klein: 0.85,
  normal: 1,
  gross: 1.17,
};

export default function App() {
  const [mengen, setMengen] = useState(Array(pakete.length).fill(0));
  const [fahrzeugtyp, setFahrzeugtyp] = useState("normal");

  const handleMenge = (index, diff) => {
    setMengen((prev) => {
      const neu = [...prev];
      neu[index] = Math.max(0, neu[index] + diff);
      return neu;
    });
  };

  const gesamtpreis = mengen.reduce((summe, menge, i) => summe + menge * pakete[i].preis, 0);
  const fahrzeugpreis = (gesamtpreis * Fahrzeugfaktor[fahrzeugtyp]).toFixed(2);

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center">TopCar Preisrechner</h1>

      <div className="flex justify-center gap-2">
        <button onClick={() => setFahrzeugtyp("klein")} className={fahrzeugtyp === "klein" ? "selected" : ""}>Kleinwagen</button>
        <button onClick={() => setFahrzeugtyp("normal")} className={fahrzeugtyp === "normal" ? "selected" : ""}>Normal</button>
        <button onClick={() => setFahrzeugtyp("gross")} className={fahrzeugtyp === "gross" ? "selected" : ""}>Großwagen</button>
      </div>

      {pakete.map((paket, index) => (
        <div key={index} className="paket">
          <div>{paket.name}</div>
          <div className="menge">
            <button onClick={() => handleMenge(index, -1)}>-</button>
            <span>{mengen[index]}</span>
            <button onClick={() => handleMenge(index, 1)}>+</button>
          </div>
        </div>
      ))}

      <div className="preis">Gesamtpreis: {fahrzeugpreis} €</div>
    </div>
  );
}