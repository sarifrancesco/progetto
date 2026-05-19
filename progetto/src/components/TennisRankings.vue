<template>
  <div class="rankings">
    <h2>🎾 Classifica Tennis</h2>

    <div class="tour-selector">
      <button @click="loadRankings('atp')" :class="{ active: tour === 'atp' }">ATP</button>
      <button @click="loadRankings('wta')" :class="{ active: tour === 'wta' }">WTA</button>
    </div>

    <div v-if="loading">Caricamento...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="players.length">
      <thead>
        <tr>
          <th>Pos.</th>
          <th>Giocatore</th>
          <th>Paese</th>
          <th>Punti</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <td>{{ player.ranking }}</td>
          <td>{{ player.name }}</td>
          <td>{{ player.country }}</td>
          <td>{{ player.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getRankings } from '../services/tennisApi';

export default {
  name: 'TennisRankings',
  data() {
    return {
      players: [],
      loading: false,
      error: null,
      tour: 'atp',
    };
  },
  mounted() {
    this.loadRankings('atp');
  },
  methods: {
    async loadRankings(tour) {
      this.tour = tour;
      this.loading = true;
      this.error = null;
      try {
        const response = await getRankings(tour);
        console.log(response.data);
        this.players = response.data.rankings || response.data || [];
      } catch (err) {
        this.error = 'Errore: ' + err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.rankings { padding: 20px; }
table { width: 100%; border-collapse: collapse; margin-top: 16px; }
th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
th { background: #1a73e8; color: white; }
tr:hover { background: #f5f5f5; }
.tour-selector { margin-bottom: 12px; }
.tour-selector button { margin-right: 8px; padding: 8px 16px; cursor: pointer; border: none; border-radius: 4px; }
.tour-selector button.active { background: #1a73e8; color: white; }
.error { color: red; }
</style>