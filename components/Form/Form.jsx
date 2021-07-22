// import Image from 'next/image'
import React from 'react'
import styles from '../../styles/Form.module.css'


export default class Form extends React.Component {

    state = {
        fullName: "",
        sex: "",
        bornDate: "",
        civil: "",
        childs: "",
        cep: "",
        uf: "",
        city: "",
        district: "",
        address: "",
        addressNumber: "",
        knowPaz: "",
        participate: "",
        group: "",
        leader: "",
        email: "",
        tel: ""
    }

    fieldValidation = (values) => {
        let validation = true
        Object.values(values).forEach(value => {
            if (value == "" && validation == true) {
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

    getCep = (event) => {
        const cep = event.target.value.replace(/[^0-9]/, "").replace(/[^\d]+/g, '')
        if (cep.length == 8) {
            const url = `https://viacep.com.br/ws/${cep}/json/`
            fetch(url, { mode: 'cors' })
                .then((res) => res.json())
                .then((data) => {
                    this.setAddress(data)
                    this.setState({ cep })
                })
        } else { return false }
    }

    setAddress = (data) => {
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

    send = async (event) => {
        event.preventDefault()
        let valid = this.fieldValidation(this.state, event.target)

        valid ? (
            console.log(this.state)
            // try {
            //     const response = await fetch('---LOCAL---', {
            //         method: 'POST',
            //         headers: {
            //             Accept: 'application/json',
            //             'Content-type': 'application/json',
            //         },
            //         body: JSON.stringify(this.state)
            //     })
            //     const j = await response.json()

            // } catch (err) {
            //     console.log(err)
            // }
        ) : alert('Por favor, preencha todos os campos para prosseguir')


    }

    render() {
        return (
            <div className={styles.form}>
                <form onSubmit={this.send}>
                    <section className={styles.section} id="personal">
                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="fullName">Nome Completo</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.fullName}
                                type="text"
                                name="fullName"
                                id="fullName" />
                        </div>

                        <div className={styles.radioButtons}>
                            <p className={styles.description}>Sexo</p>
                            <div>
                                <input
                                    onChange={this.handleInputChange}
                                    type="radio"
                                    name="sex"
                                    id="sexMale"
                                    value="Male" />
                                <label htmlFor="sexMale">Masculino</label>
                            </div>

                            <div>
                                <input
                                    onChange={this.handleInputChange}
                                    type="radio"
                                    name="sex"
                                    id="sexFemale"
                                    value="Female" />
                                <label htmlFor="sexFemale">Feminino</label>
                            </div>
                        </div>

                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="bornDate">Data de Nascimento</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.bornDate}
                                type="date"
                                name="bornDate"
                                id="bornDate"
                                className={styles.date} />
                        </div>

                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="civil">Estado Civil</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.civil}
                                type="text"
                                name="civil"
                                id="civil" />
                        </div>

                        <div className={styles.radioButtons}>
                            <p className={styles.description}>Possui Filhos?</p>

                            <div>
                                <input
                                    onChange={this.handleInputChange}
                                    type="radio"
                                    name="childs"
                                    id="childYes"
                                    value="childYes" />
                                <label htmlFor="childYes">Sim</label>
                            </div>

                            <div>
                                <input
                                    onChange={this.handleInputChange}
                                    type="radio"
                                    name="childs"
                                    id="childNo"
                                    value="childNo" />
                                <label htmlFor="childNo">Não</label>
                            </div>
                        </div>

                        <div className={styles.buttons}>
                            <a href="#enterAddress">Proximo</a>
                        </div>
                    </section>

                    <section className={styles.section} id="enterAddress">

                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="cep">Cep</label>
                            <input
                                name="cep"

                                onChange={this.getCep}
                                type="text"
                                id="cep"
                                maxLength={9} />
                        </div>

                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="uf">Estado</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.uf}
                                name="uf"
                                type="text"
                                id="uf" />
                        </div>

                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="city">Cidade</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.city}
                                name="city"
                                type="text"
                                id="city" />
                        </div>

                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="district">Bairro</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.district}
                                name="district"
                                type="text"
                                id="district" />
                        </div>

                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="address">Endereço</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.address}
                                name="address"
                                type="text"
                                id="address" />
                        </div>

                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="addressNumber">Numero</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.addressNumber}
                                name="addressNumber"
                                type="number"
                                id="addressNumber" />
                        </div>


                        <div className={styles.buttons}>
                            <a href="#personal">Anterior</a>
                            <a href="#knowUs">Proximo</a>
                        </div>

                    </section>

                    <section className={styles.section} id="knowUs">
                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="knowPaz">Como você conheceu a Paz Church?</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.knowPaz}
                                type="text"
                                name="knowPaz"
                                id="knowPaz" />
                        </div>

                        <div className={styles.radioButtons}>
                            <p className={styles.description}>Já participou de algum culto nosso?</p>
                            <div>
                                <input
                                    onChange={this.handleInputChange}
                                    type="radio"
                                    name="participate"
                                    id="pYes1"
                                    value="pYes1" />
                                <label htmlFor="pYes1">Sim, uma vez</label>
                            </div>

                            <div>
                                <input onChange={this.handleInputChange} type="radio"
                                    name="participate"
                                    id="pYesSome"
                                    value="pYesSome" />
                                <label htmlFor="pYesSome">Sim, algumas vezes</label>
                            </div>

                            <div>
                                <input onChange={this.handleInputChange} type="radio"
                                    name="participate"
                                    id="pNo"
                                    value="pNo" />
                                <label htmlFor="pNo">Não, será a primeira vez</label>
                            </div>
                        </div>

                        <div className={styles.radioButtons}>
                            <p className={styles.description}>Participa de um Life Group?</p>
                            <div>
                                <input
                                    onChange={this.handleInputChange}
                                    type="radio"
                                    name="group"
                                    id="groupYes"
                                    value="groupYes" />
                                <label htmlFor="groupYes">Sim</label>
                            </div>

                            <div>
                                <input
                                    onChange={this.handleInputChange} type="radio"
                                    name="group"
                                    id="groupNo"
                                    value="groupNo" />
                                <label htmlFor="groupNo">Não</label>
                            </div>
                        </div>

                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="leader">Quem é o lider?</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.leader}
                                type="text"
                                name="leader"
                                id="leader" />
                        </div>

                        <div className={styles.buttons}>
                            <a href="#enterAddress">Anterior</a>
                            <a href="#contact">Proximo</a>
                        </div>
                    </section>

                    <section className={styles.section} id="contact">
                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="email">Email</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                type="email"
                                name="email"
                                id="email" />
                        </div>

                        <div className={styles.question}>
                            <label className={styles.description} htmlFor="whats">Whatsapp</label>
                            <input
                                onChange={this.handleInputChange}
                                value={this.state.tel}
                                type="tel"
                                name="tel"
                                id="tel" />
                        </div>

                        <div className={styles.buttons}>
                            <a href="#knowUs">Anterior</a>
                            <button type="submit">Finalizar</button>
                        </div>
                    </section>
                </form>
            </div >
        )
    }
}
