<template>
    <div>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="number">Number</label>
                <input type="text" v-model="number" name="number" class="form-control" :class="{ 'is-invalid': submitted && !number }" />
                <div v-show="submitted && !number" class="invalid-feedback">Number is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="loading">Search</button>
                <img v-show="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
        </form>
        <br/>
        <h3>Reservations:</h3>
        <em v-if="reservations.loading">Loading reservations...</em>
        <ul v-if="reservations.length">
            <li v-for="reservation in reservations" :key="reservation.id">
                {{reservation.book_title}} - <input type="submit" value="Devolver" class="btn btn-outline-primary btn-sm" v-on:click="returnBook(reservation.id)"/>
            </li>
        </ul>
    </div>
</template>

<script>
import { reservationService } from '../_services';

export default {
    data () {
        return {
            reservations: []
        }
    },
    methods: {
        handleSubmit (e) {
            this.submitted = true;
            const { number } = this;

            // stop here if form is invalid
            if (!(number)) {
                return;
            }

            this.loading = true;

            this.reservations.loading = true;
            reservationService.getAll(number).then(reservations => { this.reservations = reservations; this.loading = false;});
        },
        returnBook (reservationId) {
            const { number } = this;

            reservationService.returnBook(reservationId).then(reservation => { alert(`Livro devolvido. Valor total a pagar: ${reservation.payment}€`); reservationService.getAll(number).then(reservations => { this.reservations = reservations; this.loading = false;}); });
        }
    }
};
</script>