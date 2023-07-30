import { View, Text, ScrollView, SafeAreaView, TouchableOpacity,TextInput } from 'react-native'
import React, { useState } from 'react'

//form validation
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'should be max of 16 characters')
    .required('length is required')
})

const App = () => {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setisPassGenerated] = useState(false)
  const [lowercase, setlowercase] = useState(false)
  const [uppercase, setuppercase] = useState(false)
  const [numbers, setnumbers] = useState(false)
  const [symbols, setsymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (uppercase) { characterList += upperCaseChars }

    if (lowercase) { characterList += lowerCaseChars }

    if (numbers) { characterList += digitChars }

    if (symbols) { characterList += specialChars }

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    setisPassGenerated(true)



  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result

  }

  const resetPasswordState = () => {

    setPassword('')
    setisPassGenerated(false)
    setlowercase(false)
    setuppercase(false)
    setnumbers(false)
    setsymbols(false)

  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView >
        <View >
          <Text className='text-2xl font-black uppercase p-4 text-center '> Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit=

            {
              values => {
                console.log(values);
                generatePasswordString(+values.passwordLength)
              }
            }
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset
              /* and other goodies */
            }) => (
              <>
                <View className='flex flex-row gap-2 p-4 justify-between items-center'>
                  <View className='flex flex-col gap-y-1'>
                  <Text className='text-xl font-bold ' > Password Length</Text>
                  {touched.passwordLength && errors.passwordLength &&(
                      <Text className=' bg-red-500 text-white p-1 rounded-lg font-light uppercase text-center '>
                        {errors.passwordLength}
                      </Text>
                  )}
                  
                  </View>
                    <View>
                      <TextInput className=' w-[70px] border-[1px] border-white rounded-xl ' value={values.passwordLength}
                        onChangeText={handleChange('passwordLength')}
                        placeholder='Ex : 8'
                        keyboardType='numeric'
                      />
                  </View>

                </View>

                <View className=' flex flex-row justify-between mx-6 items-center gap-x-10 p-4'>
                    <Text className='text-lg font-semibold '> Include lowecase</Text>
                    <BouncyCheckbox 
                      disableBuiltInState
                      isChecked = {lowercase}
                      onPress={() => setlowercase(!lowercase)}
                      fillColor='green'
                    />

                </View>

                <View className='flex flex-row justify-between mx-6 items-center gap-x-10 p-4'>
                    <Text className='text-lg font-semibold '> Include uppercase</Text>
                    <BouncyCheckbox 
                      disableBuiltInState
                      isChecked = {uppercase}
                      onPress={() => setuppercase(!uppercase)}
                      fillColor='green'
                    />

                </View>

                <View className=' flex flex-row justify-between mx-6 items-center gap-x-10 p-4'>
                    <Text className='text-lg font-semibold '> Include numbers</Text>
                    <BouncyCheckbox 
                      disableBuiltInState
                      isChecked = {numbers}
                      onPress={() => setnumbers(!numbers)}
                      fillColor='green'
                    />

                </View>

                <View className=' flex flex-row justify-between mx-6 items-center gap-x-10 p-4'>
                    <Text className='text-lg font-semibold '> Include Special Characters</Text>
                    <BouncyCheckbox 
                      disableBuiltInState
                      isChecked = {symbols}
                      onPress={() => setsymbols(!symbols)}
                      fillColor='green'
                    />

                </View>
                
                <View className='flex flex-row justify-center items-center gap-5 p-4' >
                  <TouchableOpacity
                    disabled = {!isValid}
                    onPress={() => handleSubmit()}
                  >
                    <Text className=' bg-cyan-50 text-slate-600 text-sm font-bold p-3 rounded-2xl ' >Generate password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleReset()
                      resetPasswordState()
                    }}
                  >
                    <Text className=' bg-red-500 text-white text-sm font-bold p-3 rounded-2xl '>Reset All</Text>
                  </TouchableOpacity>
                </View>
                

              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View className='flex flex-col p-2 justify-center items-center bg-white rounded-lg mx-4' >
            <Text className='text-lg font-bold text-slate-500' >Result : </Text>
            <Text className='text-s text-slate-800 font-thin'>Long press to copy </Text>
            <Text selectable={true} className='text-3xl text-slate-900 font-light p-2' > {password} </Text>
          </View>
        ) : null}
      </SafeAreaView>

    </ScrollView>
  )
}

export default App