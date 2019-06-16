<template>
  <div class="wrapper">
    <div class="backgroundImage">
      <div class="pageContent">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 sm4 offset-sm1>
              <v-card flat light>
                <v-card-title>
                  <h3>Input Fields</h3>
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
                    <v-btn color="success" @click="validate" :disabled="!valid">Run</v-btn>
                    <v-btn color="warning" @click="reset">Reset</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm2>
              <v-card >
                <v-card-text>5</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    json_object: {},
    valid: true,
    payloadMass: '',
    payloadMassRules: [
      v => !!v || 'Payload Mass is required'
    ],
    cruiseSpeed: '',
    cruiseSpeedRules: [
      v => !!v || 'Cruise Speed is required'
    ],
    cruiseAltitude: '',
    cruiseAltitudeRules: [
      v => !!v || 'Cruise Altitude is required'
    ],
    range: '',
    rangeRules: [
      v => !!v || 'Range is required'
    ],
    takeOffSpeed: '',
    takeOffSpeedRules: [
      v => !!v || 'Take Off Speed is required'
    ],
    liftDragRatio: '',
    liftDragRatioRules: [
      v => !!v || 'Lift Drag Ratio required'
    ]
  }),
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    validate() {
      if (this.$refs.form.validate()) {
        //console.log(this.$refs.form._data.inputs[0].value);
        this.json_object["payloadMass"] = parseFloat(this.$refs.form._data.inputs[0].value);
        this.json_object["cruiseSpeed"] = parseFloat(this.$refs.form._data.inputs[1].value);
        this.json_object["cruiseAltitude"] = parseFloat(this.$refs.form._data.inputs[2].value);
        this.json_object["range"] = parseFloat(this.$refs.form._data.inputs[3].value);
        this.json_object["takeOffSpeed"] = parseFloat(this.$refs.form._data.inputs[4].value);
        this.json_object["liftDragRatio"] = parseFloat(this.$refs.form._data.inputs[5].value);
        this.axios.post("/app/submit", this.json_object).then((res) => {
          console.log(res.data);
        });
      }
    }
  }
}
</script>
