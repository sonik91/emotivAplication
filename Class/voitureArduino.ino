/*
code à mettre dans la carte arduino
arduino uno
pont en h
2 moteur 
*/
/*

*/
#include <SoftwareSerial.h>
#define rxPin 11 // Broche 11 en tant que RX, à raccorder sur TX du HC-05
#define txPin 10 // Broche 10 en tant que TX, à raccorder sur RX du HC-05
SoftwareSerial bluetoothSerial(rxPin, txPin);

int moteur12 = 9;
int moteur11 = 8;

int moteur22 = 7;
int moteur21 = 6;
int etat = 1;

void setup() {
  pinMode(rxPin, INPUT);
  pinMode(txPin, OUTPUT);
  bluetoothSerial.begin(9600);

  //Serial.begin(9600);
    pinMode(moteur11, OUTPUT);
    pinMode(moteur12, OUTPUT);
    pinMode(moteur21, OUTPUT);
    pinMode(moteur22, OUTPUT);
}

void loop() {
  /*if(Serial.available()){
    int state = Serial.parseInt();
    action(state);
  }*/
  
  if(bluetoothSerial.available()){
    int state = bluetoothSerial.parseInt();
    action(state);
  }
  
  }
  
  void action(int state){
    
     if( state == 1){//avencer
      digitalWrite(moteur12, LOW);
      digitalWrite(moteur11, HIGH);
      digitalWrite(moteur22, HIGH);
      digitalWrite(moteur21, LOW);
      //Serial.println("avencer");
      bluetoothSerial.println("avencer");
    }
    
    if( state == 2){//arret
      digitalWrite(moteur12, LOW);
      digitalWrite(moteur11, LOW);
      digitalWrite(moteur22, LOW);
      digitalWrite(moteur21, LOW);
      //Serial.println("arret");
      bluetoothSerial.println("arret");
    }
    
    if( state == 3){//droite
      digitalWrite(moteur12, HIGH);
      digitalWrite(moteur11, LOW);
      digitalWrite(moteur22, HIGH);
      digitalWrite(moteur21, LOW);
      //Serial.println("droite");
      bluetoothSerial.println("droite");
    }
    
    if( state == 4){//gauche
      digitalWrite(moteur12, LOW);
      digitalWrite(moteur11, HIGH);
      digitalWrite(moteur22, LOW);
      digitalWrite(moteur21, HIGH);
      //Serial.println("gauche");
      bluetoothSerial.println("gauche");
    }
    
    if( state == 5){//reculer
      digitalWrite(moteur12, HIGH);
      digitalWrite(moteur11, LOW);
      digitalWrite(moteur22, LOW);
      digitalWrite(moteur21, HIGH);
      //Serial.println("reculer");
      bluetoothSerial.println("reculer");
    }
    
  }
