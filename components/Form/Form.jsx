import React from 'react'
import styles from '../../src/styles/Form.module.css'
import { Select } from '../Select'
import { DateInput } from '../DateInput'
import { TextInput } from '../TextInput'
import Thanks from '../Thanks/Thanks'

export default class Form extends React.Component {

    state = {
        fullName: '',
        sex: '',
        bornDate: '',
        civil: '',
        childs: '',
        cep: '',
        uf: ' ',
        city: '',
        district: '',
        address: '',
        addressNumber: '',
        addressComp: ' ',
        knowPaz: '',
        participate: '',
        group: '',
        leader: ' ',
        email: '',
        tel: '',
        success: 'wait',
        personal: styles.section,
        enterAddress: styles.section,
        knowUs: styles.section,
        contact: styles.section,
    }

    handleFieldValidation = (values) => {
        let validation = true

        Object.values(values).forEach(value => {
            if (value == '' && validation == true) {
                validation = false
            }
        })
        return validation
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSetState = (state) => {
        this.setState(state)
    }

    handleGetPhone = (event) => {
        const noMaskTel = event.target.value
        let tel = this.maskPhone(noMaskTel)
        this.setState({ tel })
    }

    maskPhone = value => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d{4})(\d)/, "$1 $2");
    }


    handleGetCep = (event) => {
        let cep = event.target.value.replace(/[^0-9]/, '').replace(/[^\d]+/g, '')

        if (cep.length == 8) {
            const url = `https://viacep.com.br/ws/${cep}/json/`
            fetch(url, { mode: 'cors' })
                .then((res) => res.json())
                .then((data) => {
                    this.handleSetAddress(data)
                })
        }

        cep = this.maskCep(cep)
        this.setState({ cep })
    }

    maskCep = (value) => {
        return value.replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    }

    handleSetAddress = (data) => {
        const uf = data.uf
        const city = data.localidade
        const district = data.bairro
        const address = data.logradouro
        this.setState({
            uf,
            city,
            district,
            address
        })
    }

    handleGetDate = (event) => {
        let bornDate = event.target.value
        bornDate = this.maskDate(bornDate)
        this.setState({ bornDate })

    }

    maskDate = value => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1");
    }

    handleSend = async (event) => {
        event.preventDefault()
        let valid = true

        if (this.handleDateValidation(this.state.bornDate) == false) {
            valid = false
            alert('Data de nascimento invalida')

        } else if (this.handleFieldValidation(this.state, event.target) == false) {
            valid = false
            alert('Por favor, preencha todos os campos para prosseguir')

        } else if (valid) {
            this.setState({ success: valid })
            try {
                const response = await fetch('/api/send-mail', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(this.state)
                })

            } catch (err) {
                console.log(err)
            }
        }

    }

    render() {
        return (
            <>
                {this.state.success == 'wait' &&
                    <div className={styles.form}>
                        <form onSubmit={this.handleSend}>
                            <section className={this.state.personal} id="personal">
                                <TextInput
                                    onChange={this.handleInputChange}
                                    value={this.state.fullName}
                                    name="fullName"
                                    label="Nome Completo" />

                                <Select
                                    name="sex"
                                    label="Sexo"
                                    onChange={this.handleInputChange}
                                    value={this.state.sex}
                                    options={[
                                        { value: "", label: "" },
                                        { value: "Male", label: "Masculino" },
                                        { value: "Female", label: "Feminino" }]} />

                                <DateInput
                                    onChange={this.handleGetDate}
                                    value={this.state.bornDate}
                                    name="bornDate"
                                    label="Data de Nascimento" />

                                <Select
                                    onChange={this.handleInputChange}
                                    label="Estado Civil"
                                    value={this.state.civil}
                                    name="civil"
                                    id="civil"
                                    options={[
                                        { value: "", label: "" },
                                        { value: "single", label: "Solteiro(a)" },
                                        { value: "married", label: "Casado(a)" },
                                        { value: "stableUnion", label: "União Estavel" },
                                        { value: "livingTogether", label: "Morando Juntos" },
                                        { value: "widower", label: "Viuvo(a)" }

                                    ]} />

                                <Select
                                    onChange={this.handleInputChange}
                                    label="Possui filhos menores de idade?"
                                    name="childs"
                                    id="childYes"
                                    value={this.state.childs}
                                    options={[
                                        { value: "", label: "" },
                                        { value: "childNo", label: "Não" },
                                        { value: "child1", label: "1" },
                                        { value: "child2", label: "2" },
                                        { value: "child3", label: "3" },
                                        { value: "child4", label: "4" },
                                        { value: "child5More", label: "5 ou mais" }
                                    ]} />

                                <div className={styles.buttons}>
                                    <a href="#enterAddress">Proximo</a>
                                </div>
                            </section>

                            <section className={styles.section} id="enterAddress">
                                <TextInput
                                    onChange={this.handleGetCep}
                                    label="Cep"
                                    value={this.state.cep}
                                    name="cep"
                                    type="text"
                                    id="cep" />

                                <TextInput
                                    onChange={this.handleInputChange}
                                    label="Endereço"
                                    value={this.state.address}
                                    name="address"
                                    type="text"
                                    id="address" />


                                <div className={styles.horizontal}>

                                    <TextInput
                                        onChange={this.handleInputChange}
                                        label="Número"
                                        value={this.state.addressNumber}
                                        name="addressNumber"
                                        type="number"
                                        id="addressNumber" />

                                    <TextInput
                                        onChange={this.handleInputChange}
                                        label="Complemento"
                                        value={this.state.addressComp}
                                        name="addressComp"
                                        type="text"
                                        id="addressComp" />

                                </div>

                                <TextInput
                                    onChange={this.handleInputChange}
                                    label="Bairro"
                                    value={this.state.district}
                                    name="district"
                                    type="text"
                                    id="district" />

                                <TextInput
                                    onChange={this.handleInputChange}
                                    label="Cidade"
                                    value={this.state.city}
                                    name="city"
                                    type="text"
                                    id="city" />

                                <div className={styles.buttons}>
                                    <a href="#personal">Anterior</a>
                                    <a href="#knowUs">Proximo</a>
                                </div>

                            </section>

                            <section className={styles.section} id="knowUs">

                                <Select
                                    onChange={this.handleInputChange}
                                    label="Como você conheceu a Paz Church?"
                                    value={this.state.knowPaz}
                                    type="text"
                                    name="knowPaz"
                                    id="knowPaz"
                                    options={[
                                        { value: "", label: "" },
                                        { value: "indication", label: "Indicação de um amigo" },
                                        { value: "youtube", label: "Youtube" },
                                        { value: "passBy", label: "Passei na frente" },
                                        { value: "others", label: "Outros" }
                                    ]} />

                                <Select
                                    onChange={this.handleInputChange}
                                    label="Já participou de algum culto nosso?"
                                    name="participate"
                                    id="pYes1"
                                    value={this.state.participate}
                                    options={[
                                        { value: "", label: "" },
                                        { value: "yesOne", label: "Sim, uma vez" },
                                        { value: "yesSome", label: "Sim, algumas vezes" },
                                        { value: "no", label: "Não, será a primeira vez" }
                                    ]}
                                />

                                <Select
                                    onChange={this.handleInputChange}
                                    label="Participa de um Life Group?"
                                    name="group"
                                    id="group"
                                    value={this.state.group}
                                    options={[
                                        { value: "", label: "" },
                                        { value: "yes", label: "Sim" },
                                        { value: "no", label: "Não" }
                                    ]}
                                />

                                {this.state.group != "no" &&
                                    <TextInput
                                        onChange={this.handleInputChange}
                                        label="Quem é o líder?"
                                        value={this.state.leader}
                                        type="text"
                                        name="leader"
                                        id="leader" />
                                }

                                <div className={styles.buttons}>
                                    <a href="#enterAddress">Anterior</a>
                                    <a href="#contact">Proximo</a>
                                </div>
                            </section>

                            <section className={styles.section} id="contact">

                                    <TextInput
                                        onChange={this.handleInputChange}
                                        label="E-mail"
                                        value={this.state.email}
                                        type="email"
                                        name="email"
                                        id="email" />

                                    <TextInput
                                        onChange={this.handleGetPhone}
                                        label="Whatsapp"
                                        value={this.state.tel}
                                        type="text"
                                        name="tel"
                                        id="tel" />

                                <div className={styles.buttons}>
                                    <a href="#knowUs">Anterior</a>
                                    <button type="submit">Finalizar</button>
                                </div>
                            </section>
                        </form>
                    </div >
                }
                {
                    this.state.success == true &&
                    <section>
                        <Thanks />
                    </section>
                }
            </>
        )
    }
}
