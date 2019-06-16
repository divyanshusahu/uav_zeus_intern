export function calc(input_data) {
    let output_data = {};
    let mass_per_iteration = [];

    let userpayload = input_data["payloadMass"];
    let cruisespeed = input_data["cruiseSpeed"];
    let cruisealtitude = input_data["cruiseAltitude"];
    let payloadmass = userpayload;
    let ran = input_data["range"];
    let takeoffspeed = input_data["takeOffSpeed"];
    let Endurance = ran / cruisespeed;
    let liftbydrag = input_data["liftDragRatio"];

    let iterations = 1;
    let MGTOM, Thrustvtol, powervtol, Energyvtol, massofmotorvtol, massofcontrollervtol, massofbatteryvtol;
    let totalmasspenalty, newpayloadmass, newtakeoffmass, masspenalty;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        MGTOM = ((payloadmass * Endurance) / 0.096) ** (1 / 1.615);
        Thrustvtol = 1.5 * 9.8 * MGTOM;
        powervtol = Thrustvtol * takeoffspeed * (5 / 18);
        Energyvtol = 2 * Thrustvtol * cruisealtitude * 1000;
        massofmotorvtol = powervtol / (5 * 1000 * 0.9);
        massofcontrollervtol = powervtol / (20 * 1000 * 0.9);
        massofbatteryvtol = Energyvtol / (3600 * 180);
        totalmasspenalty = massofmotorvtol + massofcontrollervtol + massofbatteryvtol;
        newpayloadmass = userpayload + totalmasspenalty;
        newtakeoffmass = ((newpayloadmass * Endurance) / 0.096) ** (1 / 1.615);
        masspenalty = (newtakeoffmass - MGTOM);
        iterations++;
        if (masspenalty > 0.01) {
            payloadmass = userpayload + totalmasspenalty;
            mass_per_iteration.push(MGTOM.toFixed(3));
        } else
            break;
    }

    let wingspan = 0.822 * (MGTOM) ** 0.572;
    let wingarea = 0.227 * (wingspan) ** 1.235;
    let energycruise = MGTOM * 9.8 * (1 / liftbydrag) * ran * 1000;
    let massofbatterycruise = energycruise / (3600 * 180);
    let totalmass = massofbatterycruise + massofbatteryvtol;

    output_data["no_of_iterations"] = iterations;
    output_data["mass_per_iteration"] = mass_per_iteration;
    output_data["take_off_mass"] = MGTOM.toFixed(3);
    output_data["payload"] = userpayload;
    output_data["endurance"] = Endurance.toFixed(3);
    output_data["wingspan"] = wingspan.toFixed(3);
    output_data["wingarea"] = wingarea.toFixed(3);
    output_data["massofmotorvtol"] = massofmotorvtol.toFixed(3);
    output_data["massofcontrollervtol"] = massofcontrollervtol.toFixed(3);
    output_data["massofbatteryvtol"] = massofbatteryvtol.toFixed(3);
    output_data["massofbatterycruise"] = massofbatterycruise.toFixed(3);
    output_data["totalmass"] = totalmass;

    return output_data;
}