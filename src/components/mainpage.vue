<template>
  <div class="wrapper">
    <div class="backgroundImage">
      <div class="pageContent">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm4 offset-sm1>
              <v-card height="600px">
                <v-card-title>
                  <h2>Input Fields</h2>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="payloadMass" 
                      :rules="payloadMassRules" 
                      label="Payload Mass in Kg" 
                      type="number"
                      required>
                    </v-text-field>
                    <v-text-field v-model="cruiseSpeed" 
                      :rules="cruiseSpeedRules" 
                      label="Cruise Speed in Km/hr" 
                      type="number"
                      required>
                    </v-text-field>
                    <v-text-field v-model="cruiseAltitude" 
                      :rules="cruiseAltitudeRules" 
                      label="Cruise Altitude in Km" 
                      type="number"
                      required>
                    </v-text-field>
                    <v-text-field v-model="range" 
                      :rules="rangeRules" 
                      label="Range in Km" 
                      type="number"
                      required>
                    </v-text-field>
                    <v-text-field v-model="takeOffSpeed" 
                      :rules="takeOffSpeedRules" 
                      label="Take Off Speed in Km/hr" 
                      type="number"
                      required>
                    </v-text-field>
                    <v-text-field v-model="liftDragRatio" 
                      :rules="liftDragRatioRules" 
                      label="Lift/Drag Ratio" 
                      type="number"
                      required>
                    </v-text-field> 
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="success" @click="validate" :disabled="!valid">Run</v-btn>
                  <v-btn flat color="warning" @click="reset">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm2>
              <v-card height="600px">
                <v-card-title>
                  <h2>Results</h2>
                </v-card-title>
                <v-card-text >
                  <!--<p>Take off mass is <b>{{ output_data["take_off_mass"] }}</b> Kg.</p>
                  <p>Endurance is <b>{{ output_data["endurance"] }}</b> hrs.</p>
                  <p>Mass of Battery cruise is <b>{{ output_data["massofbatterycruise"] }}</b> Kg.</p>
                  <p>Mass of Battery vtol is <b>{{ output_data["massofbatteryvtol"] }}</b> Kg.</p>
                  <p>Mass of Motor vtol is <b>{{ output_data["massofmotorvtol"] }}</b> Kg.</p>
                  <p>Mass of Controller vtol is <b>{{ output_data["massofcontrollervtol"] }}</b> Kg.</p>
                  <p>Wingspan is <b>{{ output_data["wingspan"] }}</b> m.</p>
                  <p>Wing area is <b>{{ output_data["wingarea"] }}</b> m<sup>2</sup>.</p>-->
                  <table>
                    <tbody>
                      <tr>
                        <td>Take off mass is</td>
                        <td>{{ output_data["take_off_mass"] }}</td>
                        <td> Kg.</td>
                      </tr>
                      <tr>
                        <td>Endurance is</td>
                        <td>{{ output_data["endurance"] }}</td>
                        <td> hrs.</td>
                      </tr>
                      <tr>
                        <td>Mass of Battery cruise is</td>
                        <td>{{ output_data["massofbatterycruise"] }}</td>
                        <td> Kg.</td>
                      </tr>
                      <tr>
                        <td>Mass of Battery vtol is</td>
                        <td>{{ output_data["massofbatteryvtol"] }}</td>
                        <td> Kg.</td>
                      </tr>
                      <tr>
                        <td>Mass of Motor vtol is</td>
                        <td>{{ output_data["massofmotorvtol"] }}</td>
                        <td> Kg.</td>
                      </tr>
                      <tr>
                        <td>Mass of Controller vtol is</td>
                        <td>{{ output_data["massofcontrollervtol"] }}</td>
                        <td> Kg.</td>
                      </tr>
                      <tr>
                        <td>Wingspan is</td>
                        <td>{{ output_data["wingspan"] }}</td>
                        <td> m.</td>
                      </tr>
                      <tr>
                        <td>Wing area is</td>
                        <td>{{ output_data["wingarea"] }}</td>
                        <td> m<sup>2</sup>.</td>
                      </tr>
                    </tbody>
                  </table>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import { calc } from '../calc.js';
export default {
  data: () => ({
    json_object: {},
    output_data: {},
    valid: true,
    payloadMass: '5',
    payloadMassRules: [
      v => !!v || 'Required'
    ],
    cruiseSpeed: '40',
    cruiseSpeedRules: [
      v => !!v || 'Required'
    ],
    cruiseAltitude: '1',
    cruiseAltitudeRules: [
      v => !!v || 'Required'
    ],
    range: '50',
    rangeRules: [
      v => !!v || 'Required'
    ],
    takeOffSpeed: '10',
    takeOffSpeedRules: [
      v => !!v || 'Required'
    ],
    liftDragRatio: '12',
    liftDragRatioRules: [
      v => !!v || 'Required'
    ]
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
      this.output_data = {};
      this.$forceUpdate();
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.json_object["payloadMass"] = parseFloat(this.$refs.form._data.inputs[0].value);
        this.json_object["cruiseSpeed"] = parseFloat(this.$refs.form._data.inputs[1].value);
        this.json_object["cruiseAltitude"] = parseFloat(this.$refs.form._data.inputs[2].value);
        this.json_object["range"] = parseFloat(this.$refs.form._data.inputs[3].value);
        this.json_object["takeOffSpeed"] = parseFloat(this.$refs.form._data.inputs[4].value);
        this.json_object["liftDragRatio"] = parseFloat(this.$refs.form._data.inputs[5].value);
        this.output_data = calc(this.json_object);
        try {
          this.$forceUpdate();
        }
        catch {
          // This can be empty
        }
      }
    }
  }
}
</script>
