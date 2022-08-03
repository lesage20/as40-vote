<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders"
      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <!-- <q-icon name="style" color="primary" size="56px" /> -->

          <lottie-player
            animationLink="https://assets6.lottiefiles.com/packages/lf20_4vlxeulb.json"
          ></lottie-player>

          <div class="q-mt-md text-center">
            Tu es un AS40 et tu veux participer à la digitalisation du lycée
            scientique de yamoussoukro
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <lottie-player
            animationLink="https://assets3.lottiefiles.com/packages/lf20_ulci7gmd.json"
          ></lottie-player>
          <div class="q-mt-md text-center">
            En quelques étapes viens faire ta proposition de fonctionnalités.
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center">
          <lottie-player
            animationLink="https://assets3.lottiefiles.com/private_files/lf30_mdvpx85k.json"
          ></lottie-player>
          <div class="q-mt-md text-center">
            Les autres la vote, tu votes les propositions des autres. Et nous
            développons les propositions les plus aimées
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap flex-center">
          <!-- <q-icon name="terrain" color="primary" size="56px" /> -->
          <lottie-player
            animationLink="https://assets1.lottiefiles.com/packages/lf20_cgvs9g20.json"
          ></lottie-player>
          <div class="q-mt-md text-center">
            Crée ton compte et ensemble révolutionnons le lycée scientifique
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="row q-pt-xl justify-center">
        <div class="col-8 text-center">
          <q-btn
            v-if="slide < 4"
            color="indigo"
            @click="slide++"
            label="suivant"
            class="full-width"
          >
            <q-icon right name="arrow_forward"></q-icon>
          </q-btn>
          <q-btn
            v-else
            color="indigo"
            icon="person_add"
            label="Je crée mon compte"
            :to="{ name: 'register' }"
            class="full-width"
          >
            <!-- <q-icon right name="arrow_forward"></q-icon> -->
          </q-btn>

          <q-btn
            :to="{ name: 'login' }"
            flat
            :label="slide < 4 ? 'Passer' : 'j\'ai déjà un compte'"
            class="q-mt-md full-width bg-indigo-1 text-indigo"
          >
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
const slide = ref(1);
</script>
