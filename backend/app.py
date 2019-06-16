from flask import Flask, request
import json

app = Flask(__name__)

@app.route("/app/submit", methods=["POST"])
def submit() :
    input_data = request.get_json()
    output_data = {}
    mass_per_iteration = []
    
    userpayload = input_data["payloadMass"]
    cruisespeed = input_data["cruiseSpeed"]
    cruisealtitude = input_data["cruiseAltitude"]
    payloadmass = userpayload
    ran = input_data["range"]
    takeoffspeed = input_data["takeOffSpeed"]
    Endurance = ran/cruisespeed
    liftbydrag = input_data["liftDragRatio"]
    
    iterations = 1
    while True :
        MGTOM = ((payloadmass*Endurance)/0.096)**(1/1.615)
        Thrustvtol = 1.5*9.8*MGTOM
        powervtol = Thrustvtol*takeoffspeed*(5/18)
        Energyvtol = 2*Thrustvtol*cruisealtitude*1000
        massofmotorvtol = powervtol/(5*1000*0.9)
        massofcontrollervtol = powervtol/(20*1000*0.9)
        massofbatteryvtol = Energyvtol/(3600*180)
        totalmasspenalty = massofmotorvtol+massofcontrollervtol+massofbatteryvtol
        newpayloadmass = userpayload+totalmasspenalty
        newtakeoffmass = ((newpayloadmass*Endurance)/0.096)**(1/1.615)
        masspenalty = (newtakeoffmass-MGTOM)
        iterations += 1
        if masspenalty > 0.01 :
            payloadmass = userpayload+totalmasspenalty
            mass_per_iteration.append(MGTOM)
        else :
            break
    
    wingspan = 0.822*(MGTOM)**0.572
    wingarea = 0.227*(wingspan)**1.235
    energycruise = MGTOM*9.8*(1/liftbydrag)*ran*1000
    massofbatterycruise = energycruise/(3600*180)
    totalmass = massofbatterycruise+massofbatteryvtol

    output_data["no_of_iterations"] = iterations
    output_data["mass_per_iteration"] = mass_per_iteration
    output_data["take_off_mass"] = MGTOM
    output_data["payload"] = userpayload
    output_data["endurance"] = Endurance
    output_data["wingspan"] = wingspan
    output_data["wingarea"] = wingarea
    output_data["massofmotorvtol"] = massofmotorvtol
    output_data["massofcontrollervtol"] = massofcontrollervtol
    output_data["massofbatteryvtol"] = massofbatteryvtol
    output_data["massofbatterycruise"] = massofbatterycruise
    output_data["totalmass"] = totalmass

    return json.dumps(output_data)

if __name__ == "__main__":
    app.run(debug=True)    
