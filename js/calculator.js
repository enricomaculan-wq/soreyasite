(function () {
  const HOURLY_RATE = 35;
  const MINUTES_BOOKING = 3;
  const MINUTES_FULL = 10;

  const staffInput = document.getElementById("calc-staff");
  const appointmentsInput = document.getElementById("calc-appointments");
  const fields = {
    min: {
      hours: document.getElementById("calc-hours-min"),
      cost: document.getElementById("calc-cost-min"),
      hoursY: document.getElementById("calc-hours-min-y"),
      costY: document.getElementById("calc-cost-min-y"),
    },
    full: {
      hours: document.getElementById("calc-hours-full"),
      cost: document.getElementById("calc-cost-full"),
      hoursY: document.getElementById("calc-hours-full-y"),
      costY: document.getElementById("calc-cost-full-y"),
    },
  };

  if (!staffInput || !appointmentsInput) return;

  const euro = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const hoursFmt = new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 0,
  });

  function readValue(input, fallback) {
    const n = parseInt(input.value, 10);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  }

  function calc(staff, appointments, minutes) {
    const hoursMonth = (staff * appointments * minutes) / 60;
    const costMonth = hoursMonth * HOURLY_RATE;
    return {
      hoursMonth,
      costMonth,
      hoursYear: hoursMonth * 12,
      costYear: costMonth * 12,
    };
  }

  function render(target, data) {
    target.hours.textContent = hoursFmt.format(data.hoursMonth);
    target.cost.textContent = euro.format(data.costMonth);
    target.hoursY.textContent = hoursFmt.format(data.hoursYear);
    target.costY.textContent = euro.format(data.costYear);
  }

  function update() {
    const staff = readValue(staffInput, 1);
    const appointments = readValue(appointmentsInput, 1);

    staffInput.value = staff;
    appointmentsInput.value = appointments;

    render(fields.min, calc(staff, appointments, MINUTES_BOOKING));
    render(fields.full, calc(staff, appointments, MINUTES_FULL));
  }

  staffInput.addEventListener("input", update);
  appointmentsInput.addEventListener("input", update);
  update();
})();
