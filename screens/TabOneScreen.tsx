import React,{ Key, useState } from "react";
import { View, Text, Button, Image, ScrollView, TouchableOpacity,Alert, Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const squareSize = 39;

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0, direction: 'NORTH' });
  const [log, setLog] = useState('');
  const [angle, setAngle] = useState(0);
  const [myExplosionArray, setExplosionArray] = useState([]);
  const [selected, setSelected] = useState(false);


  const handlePlace = (x: number, y: number, direction: string) => {
    if (x < 0 || x > 10 || y < 0 || y > 10) {
      return;
    }
    switch (direction) {
      case 'SOUTH':
        setAngle(180);
        break;
      case 'NORTH':
        setAngle(0);
        break;
      case 'EAST':
        setAngle(90);
        break;
      case 'WEST':
        setAngle(270);
        break;
    }
    
    setPosition({ x, y, direction });
    setLog(`PLACE ${x},${y},${direction}\n`);
    console.log(`PLACE ${x},${y},${direction}\n`);
  };

  const handleMove = () => {
    const { x, y, direction } = position;
    let newX = x;
    let newY = y;
    switch (direction) {
      case 'SOUTH':
        newY = y - 1 >= 0 ? y - 1 : y;
        break;
      case 'NORTH':
        newY = y + 1 < 10 ? y + 1 : y;
        break;
      case 'EAST':
        newX = x + 1 < 10 ? x + 1 : x;
        break;
      case 'WEST':
        newX = x - 1 >= 0 ? x - 1 : x;
        break;
    }
    const explosionExists = myExplosionArray.some(
      explosion => explosion[0] === newX && explosion[1] === newY
    );
    if (explosionExists) {
      setLog(log+ 'tile has been blown!\n');
      return;
    }
    setPosition({ ...position, x: newX, y: newY });
    setLog(log + 'MOVE\n');
    console.log(`${x},${y},${direction}\n`);
    };

  const handleLeft = () => {
    let newDirection = '';
    switch (position.direction) {
      case 'NORTH':
        newDirection = 'WEST';
        break;
      case 'WEST':
        newDirection = 'SOUTH';
        break;
      case 'SOUTH':
        newDirection = 'EAST';
        break;
      case 'EAST':
        newDirection = 'NORTH';
        break;
    }
    setPosition({ ...position, direction: newDirection });
    setLog(log + 'LEFT\n');
    setAngle(angle - 90);
    console.log(angle);
  };

  const handleRight = () => {
    let newDirection = '';
    switch (position.direction) {
      case 'NORTH':
        newDirection = 'EAST';
        break;
      case 'EAST':
        newDirection = 'SOUTH';
        break;
      case 'SOUTH':
        newDirection = 'WEST';
        break;
      case 'WEST':
        newDirection = 'NORTH';
        break;
    }
    setPosition({ ...position, direction: newDirection });
    setLog(log + 'RIGHT\n');
    setAngle(angle + 90);
    console.log(angle);
  };

  const addExplosion = (x: number, y: number) => {
    

    const ExplosionExists = myExplosionArray.some(myExplosionArray => myExplosionArray[0] === x && myExplosionArray[1] === y);

    if (!ExplosionExists) {
      setExplosionArray([...myExplosionArray, [x, y]]);
    }
  };

  const handleFireProjectile = () => {
    const { x, y, direction } = position;
    let newExplosionArray = [...myExplosionArray];
    console.log(newExplosionArray.toString());
    switch (direction) {
      case 'NORTH':
        if (y + 2 < 10) 
          addExplosion(x, y + 2);
          break;
      case 'EAST':
        if (x + 2 < 10) 
          addExplosion(x+2, y);
          break;
      case 'SOUTH':
        if (y - 2 >= 0) 
          addExplosion(x, y-2);
          break;
      case 'WEST':
        if (x - 2 >= 0) 
          addExplosion(x-2, y);
          break;
    }
    setLog(log + 'FIRE PROJECTILE\n');
  };
    
  const handleReport = () => {
    setLog(log + `REPORT: ${position.x},${position.y},${position.direction}\n`);
  };

  const showModal = (x: number,y: number) => {
    Alert.alert(
      'Choose a direction',
      'Which side do you want the drone to face?',
      [
        {
          text: 'NORTH',
          onPress: () => handlePlace(x,y,'NORTH'),
          textStyle: { color: 'red', fontSize: 18 },
        },
        {
          text: 'SOUTH',
          onPress: () => handlePlace(x,y,'SOUTH'),
          textStyle: { color: 'red', fontSize: 18 },
        },
        {
          text: 'EAST',
          onPress: () => handlePlace(x,y,'EAST'),
          textStyle: { color: 'red', fontSize: 18 },
        },
        {
          text: 'WEST',
          onPress: () => handlePlace(x,y,'WEST'),
          textStyle: { color: 'red', fontSize: 18 },
        },
      ],
      { cancelable: false
       },
    );
  };

  const handlePlaceButtonPress = () => {
    setSelected(true);
    console.log(selected);
  };

  const handleBoardContainerPress = (event: { nativeEvent: { pageX: number; pageY: number; }; }) => {
    if (!selected) {
      return;
    }
    const x =Math.floor(event.nativeEvent.pageX / squareSize);
    const y =Math.abs(Math.floor(event.nativeEvent.pageY / squareSize) - 10);
    //now pop up to select the direction!, and rotate the image accordingly
    showModal(x,y);
    console.log(showModal);
    setSelected(false);
  };


    return (
        
        <View style={styles.container}>
          
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>TOY DRONE ASSESSMENT</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={selected ? styles.highlightBoardContainer : styles.boardContainer}
            onPress={handleBoardContainerPress}
          >
          <View style={selected ? styles.highlightBoardContainer : styles.boardContainer} onPress={handleBoardContainerPress}>
            {[...Array(10)].map((_, row) =>
              [...Array(10)].map((_, col) => (
                <View
                  key={`${row}-${col}`}
                  style={[
                    styles.square,
                    {
                      bottom: row * squareSize,
                      left: col * squareSize,
                      backgroundColor: (row + col) % 2 === 0 ? 'blue' : 'silver',
                    },
                  ]}
                />
              ))
            )}

            
            <View style={[styles.drone, { bottom: position.y * squareSize, left: position.x * squareSize },{ transform: [{ rotate: `${angle}deg` }] }]} >
            <Image
              source={require('../assets/images/droneImg.png')}
              style={styles.droneImage}
              resizeMode="cover"
            />
            </View>
            
            <View>
              {myExplosionArray.map((explosion: [any, any], index: Key | null | undefined) => {
                const [x, y] = explosion;
                return (
                  <View key={index} style={{ position: 'absolute', left: (x-5) * squareSize, bottom: (y-5) * squareSize }}>
                    <Image
                      source={require('../assets/images/explosionImg.png')}
                      style={styles.explosionImage}
                      resizeMode="cover"
                    />
                  </View>
                );
              })}
            </View>

          </View>
        </TouchableOpacity>
          
          <View style={styles.controlsContainer}>
            <Button title="Fire Projectile" onPress={handleFireProjectile} />
            
            <Button title="Place" onPress={handlePlaceButtonPress}/>
            <View style={styles.directionButtons}>
              <Button title="LEFT" onPress={handleLeft}>
              <Image
                source={require('../assets/images/droneImg.png')}
                style={[styles.droneImage, { transform: [{ rotate: `${angle}deg` }] }]}
                resizeMode="cover"
              />
              </Button>
              <Button title="MOVE" onPress={handleMove} />
              
              <Button title="RIGHT" onPress={handleRight}>
                <Image
                  source={require('../assets/images/droneImg.png')}
                  style={[styles.droneImage, { transform: [{ rotate: `${angle}deg` }] }]}
                  resizeMode="cover"
                />
              </Button>
            </View>
            <Button title="Report" onPress={handleReport} />
            <View style={styles.logContainer}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.logText}>
                {log}
              </Text>
            </ScrollView>
            </View>

          </View>
        </View>
        
    );
 
} 

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
boardContainer: {
    width: squareSize * 10,
    height: squareSize * 10,
    borderWidth: 3,
    borderColor: 'black',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
},
highlightBoardContainer: {
  width: squareSize * 10,
  height: squareSize * 10,
  borderWidth: 3,
  borderColor: 'yellow',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center'
},
drone: {
  width: squareSize,
  height: squareSize,
  position: 'absolute',
  zIndex:1
},
droneImage: {
  width: '100%',
  height: '100%'
},
explosion: {
  width: squareSize,
  height: squareSize,
  position: 'absolute',
  zIndex:1
},
explosionImage: {
  width: squareSize,
  height: squareSize,
},
row: {
    flexDirection: 'row',
},
square: {
    width: squareSize,
    height: squareSize,
    position: 'absolute',
    
},
alertContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

controlsContainer: {
    marginTop: 20,
    width: '80%',
},
input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 10,
},
directionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
},
scrollView: {
  height: 200,
  margin: 10
},
logText: {
  fontSize: 12
}

});
      