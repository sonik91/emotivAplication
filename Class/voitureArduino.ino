/*
code à mettre dans la carte arduino
arduino uno
pont en h
2 moteur 
*/
//moteur 1
int moteur12 = 9;
int moteur11 = 8;
//moteur 2
int moteur22 = 7;
int moteur21 = 6;
int moteur12 = 9;
int moteur11 = 8;

int moteur22 = 7;
int moteur21 = 6;
int etat = 1;

void setup() {
  Serial.begin(9600);
    pinMode(moteur11, OUTPUT);
    pinMode(moteur12, OUTPUT);
    pinMode(moteur21, OUTPUT);
    pinMode(moteur22, OUTPUT);
}

void loop() {
  if(Serial.available()){
    int state = Serial.parseInt();
    
    if( state == 1){//avencer
      digitalWrite(moteur12, LOW);
      digitalWrite(moteur11, HIGH);
      digitalWrite(moteur22, HIGH);
      digitalWrite(moteur21, LOW);
      Serial.println("avencer");
    }
    
    if( state == 2){//arret
      digitalWrite(moteur12, LOW);
      digitalWrite(moteur11, LOW);
      digitalWrite(moteur22, LOW);
      digitalWrite(moteur21, LOW);
      Serial.println("arret");
    }
    
    if( state == 3){//droite
      digitalWrite(moteur12, HIGH);
      digitalWrite(moteur11, LOW);
      digitalWrite(moteur22, HIGH);
      digitalWrite(moteur21, LOW);
      Serial.println("arret");
    }
    
    if( state == 4){//gauche
      digitalWrite(moteur12, LOW);
      digitalWrite(moteur11, HIGH);
      digitalWrite(moteur22, LOW);
      digitalWrite(moteur21, HIGH);
      Serial.println("arret");
    }
    
    if( state == 5){//reculer
      digitalWrite(moteur12, HIGH);
      digitalWrite(moteur11, LOW);
      digitalWrite(moteur22, LOW);
      digitalWrite(moteur21, HIGH);
      Serial.println("arret");
    }
  }
  }
