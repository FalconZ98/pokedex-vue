<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PokemonTeamController extends AbstractController
{
    #[Route('/pokemon/team', name: 'app_pokemon_team')]
    public function index(): Response
    {
        return $this->render('pokemon_team/index.html.twig', [
            'controller_name' => 'PokemonTeamController',
        ]);
    }
}
